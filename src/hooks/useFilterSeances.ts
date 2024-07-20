import { useState, useEffect } from "react";

import { TFData, TFilm, THall, TSeance } from "@/models/SessionsModel";

export const useFilterSeances = (data: any) => {
	const [films, setFilms] = useState<TFData>([]);

	useEffect(() => {
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
            (seance: TSeance) => seance.seance_hallid === hall.id,
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
  }, [data]);
	
  return { films };
};
