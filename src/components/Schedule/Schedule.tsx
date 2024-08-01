import { TFilm, TSeance } from "@/models/SessionsModel";
import { ScheduleView } from "./ScheduleView";
import { useState, useEffect } from "react";

type TProps = {
  availableHalls: { name: string; id: number }[];
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  allData: any;
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

export const Schedule = ({
  availableHalls,
  handleDrop,
  handleDragOver,
  allData,
}: TProps) => {
  const [seancesGrid, setSeancesGrid] = useState<TTimeLine[]>([]);

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
    const timeLine = allData.data.result.seances;
    const films = allData.data.result.films;

    const filteredSeances: TTimeLine[] = [];

    availableHalls.forEach((hall) => {
      filteredSeances.push({
        hallId: hall.id,
        hallName: hall.name,
        timeLine: timeLine
          .filter((seance: TSeance) => seance.seance_hallid === hall.id)
          .map((seance: TSeance) => {
            const curFilm = films.find(
              (film: TFilm) => film.id === seance.seance_filmid,
            );

            const filmIndex = films.indexOf(curFilm) % 4;

            const { timeStartPercent, timeDurationPercent } = setTimePosition(
              seance.seance_time,
              curFilm.film_duration,
            );

						console.log(timeStartPercent, timeDurationPercent)

            return {
              id: seance.id,
              filmName: curFilm.film_name,
              widthPercent: timeDurationPercent,
              startPercent: timeStartPercent,
              bg: Colors[filmIndex].bg,
							border: Colors[filmIndex].border,
              time: seance.seance_time,
            };
          }),
      });
    });

    setSeancesGrid(filteredSeances);
  }, [allData.data, availableHalls]);

  const setTimePosition = (timeStart: string, timeDuration: number) => {
    const [hours, minutes] = timeStart.split(":");

    const timeStartPercent = ((+hours * 60 + +minutes) / (24 * 60)) * 100;
    const timeDurationPercent = (timeDuration / (24 * 60)) * 100;

    return { timeStartPercent, timeDurationPercent };
  };

  useEffect(() => {
    console.log(seancesGrid);
  }, [seancesGrid]);
  return (
    <ScheduleView
      handleDrop={handleDrop}
      handleDragOver={handleDragOver}
      seancesGrid={seancesGrid}
    />
  );
};
