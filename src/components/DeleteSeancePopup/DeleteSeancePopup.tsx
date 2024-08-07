import { useEffect } from "react";
import { DeleteSeancePopupView } from "./DeleteSeancePopupView";
import { useDeleteSeance } from "@/services";
import { TAvFilms } from "@/models/AddFilmModel";
import { TTimeLine } from "../SessionGrid/SessionGrid";
import { TSeance } from "@/models/SessionsModel";

type TProps = {
  handlePopup: (event: React.MouseEvent) => void;
  handleCancel: () => void;
  popupRef: React.RefObject<HTMLDivElement>;
  seanceId: number | null;
  filmName: string;
	availableFilms: TAvFilms[];
	setSeancesGrid: React.Dispatch<React.SetStateAction<TTimeLine[]>>;
	hallId: number | null;
};

export const DeleteSeancePopup = ({
  handlePopup,
  handleCancel,
  popupRef,
  seanceId,
  filmName,
	availableFilms,
	setSeancesGrid,
	hallId,
}: TProps) => {
  const { data, isLoading, fetchData } = useDeleteSeance();

	const Colors = [
    {
      bg: "#CAFF85",
      border: "#8eb35d",
    },
    {
      bg: "#85ff89",
      border: "#5db360",
    },
    {
      bg: "#7df0c7",
      border: "#5db394",
    },
    {
      bg: "#85e2ff",
      border: "#5d9fb3",
    },
    {
      bg: "#8599ff",
      border: "#5d6bb3",
    },
  ];

	useEffect(() => {
		if (data?.success && data.result) {
      const films = availableFilms;

      setSeancesGrid((prev: TTimeLine[]) => {
        const currentHall = prev.find(
          (hall) => hall.hallId === hallId,
        );
        const updSeances = data.result.seances.filter((seance: TSeance) => {
          return seance.seance_hallid === hallId;
        });

        if (!currentHall) {
          return prev;
        }

        currentHall.timeLine = updSeances.map((seance: TSeance) => {
          const curFilm = films.find(
            (film) => film.filmId === seance.seance_filmid,
          );
          if (!curFilm) {
            return;
          }
          const filmIndex = films.indexOf(curFilm) % 4;

          const { timeStartPercent, timeDurationPercent } = setTimePosition(
            seance.seance_time,
            +curFilm.filmDuration,
          );

          return {
            id: seance.id,
            filmName: curFilm.filmName,
            widthPercent: timeDurationPercent,
            startPercent: timeStartPercent,
            bg: Colors[filmIndex].bg,
            border: Colors[filmIndex].border,
            time: seance.seance_time,
          };
        });

        const updGrid = prev.map((hall) => {
          if (hall.hallId === hallId) {
            return currentHall;
          } else {
            return hall;
          }
        });

        return updGrid;
      });

      handleCancel();
    }
	}, [data]);

	const setTimePosition = (timeStart: string, timeDuration: number) => {
    const [hours, minutes] = timeStart.split(":");

    const timeStartPercent = ((+hours * 60 + +minutes) / (24 * 60)) * 100;
    const timeDurationPercent = (timeDuration / (24 * 60)) * 100;

    return { timeStartPercent, timeDurationPercent };
  };

  const handleDeleteSeance = () => {
    if (!seanceId) {
      return;
    }
		
    fetchData(seanceId);
  };
  return (
    <DeleteSeancePopupView
      handleCancel={handleCancel}
      handlePopup={handlePopup}
      popupRef={popupRef}
      filmName={filmName}
			handleDeleteSeance={handleDeleteSeance}
			isLoading={isLoading}
    />
  );
};
