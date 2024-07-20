import { useState, useEffect } from "react";
import { TFilm, TSeance, THall } from "@/models/SessionsModel";
import { getSeancesData } from "@/services/getSeancesData";

export const useReservation = (seanceId: string | undefined) => {
  const [film, setFilm] = useState<TFilm | null>(null);
  const [hall, setHall] = useState<string | null>(null);

  const { data } = getSeancesData(`https://shfe-diplom.neto-server.ru/alldata`);

  useEffect(() => {
		if (!seanceId) {
			return;
    }

		const hallId = data?.result?.seances.find((seance: TSeance) => seance.id === +seanceId)
		.seance_hallid

    setHall(
      data?.result?.halls.find((hall: THall) => hall.id === hallId)?.hall_name,
    );

    const filmId = data?.result?.seances.find(
      (seance: TSeance) => seance.id === +seanceId,
    )?.seance_filmid;

    setFilm(data?.result?.films.find((film: TFilm) => film.id === filmId));
  }, [data, seanceId]);

  return { film, hall };
};
