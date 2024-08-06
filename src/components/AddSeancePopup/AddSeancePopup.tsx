import { AddSeancePopupView } from "./AddSeancePopupView";
import { TAvFilms } from "@/models/AddFilmModel";
import { useEffect, useRef, useState } from "react";
import { useAddSeance } from "@/services";
import { TTimeLine } from "../SessionGrid/SessionGrid";
import { TSeance } from "@/models/SessionsModel";

type TProps = {
  handlePopup: (event: React.MouseEvent) => void;
  handleCancel: () => void;
  popupRef: React.RefObject<HTMLDivElement>;
  seanceInfo: {
    hallId: number | null;
    filmId: number | null;
  };
  availableFilms: TAvFilms[];
  availableHalls: { id: number | null; name: string }[];
  seancesGrid: TTimeLine[];
  setSeancesGrid: React.Dispatch<React.SetStateAction<TTimeLine[]>>;
};

export const AddSeancePopup = ({
  handlePopup,
  handleCancel,
  popupRef,
  seanceInfo,
  availableFilms,
  availableHalls,
  seancesGrid,
  setSeancesGrid,
}: TProps) => {
  const [selectedHall, setSelectedHall] = useState<{
    id: number | null;
    name: string;
  }>({
    id: null,
    name: "",
  });
  const [selectedFilm, setSelectedFilm] = useState<{
    id: number | null;
    name: string;
  }>({
    id: null,
    name: "",
  });
  const [time, setTime] = useState<string>("00:00");
  const timeRef = useRef<HTMLInputElement>(null);

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

  const { data, isLoading, fetchData } = useAddSeance();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedHall.id || !selectedFilm.id) {
      return;
    }
    fetchData({
      seanceHallid: selectedHall.id,
      seanceFilmid: selectedFilm.id,
      seanceTime: time,
    });
  };
  useEffect(() => {
    console.log(seancesGrid);
  }, [seancesGrid]);

  useEffect(() => {
    if (data?.success && data.result) {
      const films = availableFilms;

      setSeancesGrid((prev: TTimeLine[]) => {
        const currentHall = prev.find(
          (hall) => hall.hallId === selectedHall.id,
        );
        const updSeances = data.result.seances.filter((seance: TSeance) => {
          return seance.seance_hallid === selectedHall.id;
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
          if (hall.hallId === selectedHall.id) {
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTime(value);
  };

  useEffect(() => {
    const hallId = seanceInfo.hallId;

    const currentHall = availableHalls.find((hall) => {
      return hall.id === hallId;
    });

    setSelectedHall({
      id: currentHall?.id || null,
      name: currentHall?.name || "",
    });

    const currentFilm = availableFilms.find((film) => {
      return film.filmId === seanceInfo.filmId;
    });

    setSelectedFilm({
      id: currentFilm?.filmId || null,
      name: currentFilm?.filmName || "",
    });
  }, [availableHalls, availableFilms]);

  const handleSelectHall = (id: number | null, name: string) => {
    setSelectedHall({
      id: id,
      name: name,
    });
  };
  const handleSelectFilm = (id: number | null, name: string) => {
    setSelectedFilm({
      id: id,
      name: name,
    });
  };

  return (
    <AddSeancePopupView
      handlePopup={handlePopup}
      handleCancel={handleCancel}
      popupRef={popupRef}
      handleSelectHall={handleSelectHall}
      handleSelectFilm={handleSelectFilm}
      selectedHall={selectedHall}
      selectedFilm={selectedFilm}
      availableFilms={availableFilms}
      availableHalls={availableHalls}
      timeRef={timeRef}
      time={time}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      data={data}
    />
  );
};
