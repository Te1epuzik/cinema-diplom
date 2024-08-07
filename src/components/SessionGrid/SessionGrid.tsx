import { useEffect, useRef, useState } from "react";
import Draggabilly from "draggabilly";
import { SessionGridView } from "./SessionGridView";
import { TFilm } from "@/models/SessionsModel";
import { TAvFilms } from "@/models/AddFilmModel";
import { useDeleteFilm } from "@/services";

type TProps = {
  position: "first" | "middle" | "last";
  allData: any;
  availableHalls: { name: string; id: number }[];
};

export type TCurSeance = {
  id: number;
  filmName: string;
  widthPercent: number;
  startPercent: number;
  bg: string;
  border: string;
  time: string;
};

export type TTimeLine = {
  hallId: number;
  hallName: string;
  timeLine: TCurSeance[];
};

export const SessionGrid = ({ position, allData, availableHalls }: TProps) => {
  const [seancesGrid, setSeancesGrid] = useState<TTimeLine[]>([]);
	const [deleteSeance, setDeleteSeance] = useState<{ 
		trigger: boolean;
		id: number | null;
		film: string;
		hallId: number | null;
	}>({
		trigger: false,
		id: null,
		film: "",
		hallId: null,
	}); // delete seance popup trigger
  const [addFilm, setAddFilm] = useState<boolean>(false); // add film popup trigger
  const [addSeance, setAddSeance] = useState<boolean>(false); // add seance popup trigger
  const [seanceInfo, setSeanceInfo] = useState<{
    hallId: number | null;
    filmId: number | null;
  }>({
    hallId: null,
    filmId: null,
  });
  const [deleteFilm, setDeleteFilm] = useState<boolean>(false); // delete popup trigger
  const [filmToDelete, setFilmToDelete] = useState<{
    id: number | null;
    name: string;
  }>({
    id: null,
    name: "",
  });
  const [availableFilms, setAvailableFilms] = useState<TAvFilms[]>([]);
  const popupRef = useRef<HTMLDivElement>(null);
  const filmsRef = useRef<HTMLDivElement>(null);
  const { data, fetchData } = useDeleteFilm();

	const handleDeleteSeancePopup = (event: React.MouseEvent) => {
		if (
      popupRef &&
      popupRef.current &&
      popupRef.current.contains(event.target as Node)
    ) {
      return;
    }
    setDeleteSeance({
			trigger: false,
			id: null,
			film: "",
			hallId: null,
    });
	}

  useEffect(() => {
    const films = filmsRef.current?.querySelectorAll(".film");

    if (!films) {
      return;
    }

    films.forEach((film) => {
      const draggable = new Draggabilly(film);

      if (!(film instanceof HTMLElement)) {
        return;
      }

      draggable.on("pointerDown", () => {
        film.style.zIndex = "2";
        film.style.cursor = "grabbing";
      });

      draggable.on("staticClick", () => {
        film.style.zIndex = "1";
        film.style.cursor = "grab";
      });
			
      draggable.on("pointerUp", (_event: Event, pointer: MouseEvent | Touch) => {
        // @ts-ignore
        draggable.setPosition(0, 0);
        film.style.zIndex = "1";
        film.style.cursor = "grab";
				film.style.pointerEvents = "none";
        const releasedOver = document.elementFromPoint(pointer.clientX, pointer.clientY);
				film.style.pointerEvents = "auto";
        const hall = releasedOver?.closest(".schedule-hall");

        if (hall && film) {
          setAddSeance(true);
          const hallId = hall && Number(hall.getAttribute("id"));
          const filmId = film && Number(film.getAttribute("id"));

          setSeanceInfo({
            hallId: hallId,
            filmId: filmId,
          });
        }
      });

      return () => {
        draggable.destroy();
      };
    });
  }, [filmsRef.current, availableFilms]);

  const handleAddFilmPopup = (event: React.MouseEvent) => {
    if (
      popupRef &&
      popupRef.current &&
      popupRef.current.contains(event.target as Node)
    ) {
      return;
    }
    setAddSeance((prev) => {
      return !prev;
    });
  };

  const handleDeleteFilmPopup = (
    event: React.MouseEvent,
    filmId?: number,
    filmName?: string,
  ) => {
    if (
      popupRef &&
      popupRef.current &&
      popupRef.current.contains(event.target as Node)
    ) {
      return;
    }
    if (filmId && filmName) {
      setFilmToDelete({
        id: filmId,
        name: filmName,
      });
    } else {
      setFilmToDelete({
        id: null,
        name: "",
      });
    }
    setDeleteFilm(!deleteFilm);
  };

  const handleDeleteFilm = (filmId: number) => {
    fetchData(filmId);
  };

  useEffect(() => {
    if (data && data.result && data.result) {
      setAvailableFilms(
        data.result.films.map((film: TFilm) => {
          return {
            filmId: film.id,
            filmName: film.film_name,
            filmDuration: film.film_duration,
            filmPoster: film.film_poster,
          };
        }),
      );
    }
  }, [data]);

  useEffect(() => {
    if (!allData.data?.result?.films) {
      return;
    }

    const allFilms = allData.data.result.films;
    const films: TAvFilms[] = allFilms.map((film: TFilm) => ({
      filmId: film.id,
      filmName: film.film_name,
      filmDuration: film.film_duration,
      filmPoster: film.film_poster,
    }));

    setAvailableFilms(films);
  }, [allData.data]);

  const handleAddFilm = (event: React.MouseEvent) => {
    if (
      popupRef &&
      popupRef.current &&
      popupRef.current.contains(event.target as Node)
    ) {
      return;
    }

    setAddFilm(!addFilm);
  };

  const handleCancel = () => {
    if (addFilm) {
      setAddFilm(false);
    } else if (deleteFilm) {
      setDeleteFilm(false);
    } else if (addSeance) {
      setAddSeance(false);
		} else if (deleteSeance) {
			setDeleteSeance({
				trigger: false,
				id: null,
				film: "",
				hallId: null,
			})
		}
  };

  return (
    <SessionGridView
      position={position}
      handleAddFilm={handleAddFilm}
      popupRef={popupRef}
      handleCancel={handleCancel}
      addFilm={addFilm}
      availableFilms={availableFilms}
      handleDeleteFilm={handleDeleteFilm}
      setAvailableFilms={setAvailableFilms}
      availableHalls={availableHalls}
      allData={allData}
      handleDeleteFilmPopup={handleDeleteFilmPopup}
      filmToDelete={filmToDelete}
      deleteFilm={deleteFilm}
      filmsRef={filmsRef}
      seanceInfo={seanceInfo}
      handleAddFilmPopup={handleAddFilmPopup}
      addSeance={addSeance}
      seancesGrid={seancesGrid}
      setSeancesGrid={setSeancesGrid}
			setDeleteSeance={setDeleteSeance}
			deleteSeance={deleteSeance}
			handleDeleteSeancePopup={handleDeleteSeancePopup}
    />
  );
};
