import { useState, useEffect } from "react";

import { TFData, TFilm, THall, TSeance } from "@/models/SessionsModel";

export const useFilterSeances = (data: any, date: string | undefined) => {
	const [films, setFilms] = useState<TFData>([]);

	const calcTime = (time: string) => {
		if (!date || !time) {
			return;
		}

		const [hours, minutes] = time.split(":");
		return (+hours * 60 + +minutes) * 60 * 1000 + new Date(date).getTime() - 3 * 60 * 60 * 1000;
	}

	useEffect(() => {
		if (!date) {
			return;
		}
		const currentTime = new Date().getTime();

    const updatedData = data?.result?.films.map((film: TFilm) => {
      const seances = data.result.seances.filter(
        (seance: TSeance) => seance.seance_filmid === film.id,
      );

      const halls: THall[] = [];

      // сортирую залы для текущего фильма и пушу в массив Halls
      seances.forEach((seance: TSeance, i: number) => {
        if (!halls.find((hall: THall) => hall.id === seance.seance_hallid)) {
          halls.push(
            ...data.result.halls.filter(
              (hall: THall) => hall.id === seances[i].seance_hallid,
            ),
          );
        }
      });

			// распределяю сеансы по залам
      const filteredHalls = halls.map((hall: THall) => {

        return {
          ...hall,
          seances: seances.filter(
            (seance: TSeance) => {
							const seanceTime = calcTime(seance.seance_time)

							return seance.seance_hallid === hall.id && seanceTime && seanceTime > currentTime
							},
          ),
        };
      });

			// в итоге получаю массив фильмов
			// в каждом объекте фильма находится массив залов, в котором его показывают
			// и в каждом зале массив сеансов
      return {
        ...film,
        halls: filteredHalls,
      };
    });

    setFilms(updatedData);
  }, [data, date]);
	
  return { films };
};
