import { SessionGridView } from "./SessionGridView";
import { useEffect, useRef, useState } from "react";
import { TFilm } from "@/models/SessionsModel";
import { TAvFilms } from "@/models/AddFilmModel";
import { useDeleteFilm } from "@/services"

type TProps = {
  position: "first" | "middle" | "last";
	allData: any;
};

export const SessionGrid = ({ position, allData }: TProps) => {
  const [addFilm, setAddFilm] = useState(false);
	const [availableFilms, setAvailableFilms] = useState<TAvFilms[]>([]);
  const popupRef = useRef<HTMLDivElement>(null);
	const { data, fetchData } = useDeleteFilm();


	const handleDeleteFilm = (filmId: number) => {
		fetchData(filmId)
	}

	useEffect(() => {
		if (data && data.result && data.result) {
			setAvailableFilms(data.result.films.map((film: TFilm) => {
				return {
					filmId: film.id,
					filmName: film.film_name,
					filmDuration: film.film_duration,
					filmPoster: film.film_poster,
				}
			}))
		}
	}, [data])

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

	}, [allData.data])

	useEffect(() => {
		console.log(availableFilms)

	}, [availableFilms])

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
    setAddFilm(false);
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
    />
  );
};
