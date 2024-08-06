import { TFilm, TSeance } from "@/models/SessionsModel";
import { ScheduleView } from "./ScheduleView";
import { useEffect, useRef } from "react";
import Draggabilly from "draggabilly";

type TProps = {
  availableHalls: { name: string; id: number }[];
  allData: any;
	seancesGrid: TTimeLine[];
	setSeancesGrid: React.Dispatch<React.SetStateAction<TTimeLine[]>>
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

export const Schedule = ({ availableHalls, allData, seancesGrid, setSeancesGrid }: TProps) => {
  const seancesRef = useRef<HTMLDivElement>(null);

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
    const seances = seancesRef.current?.querySelectorAll(".seance");

    if (!seances) {
      return;
    }

    seances.forEach((seance) => {
      const draggable = new Draggabilly(seance);
      const schedule = seance.parentElement?.parentElement;

      if (
        !(seance instanceof HTMLElement) ||
        !schedule ||
        !(schedule instanceof HTMLElement)
      ) {
        return;
      }

      const startPosition = {
        x: draggable.position.x,
        y: draggable.position.y,
      };

      draggable.on("pointerDown", () => {
        seance.style.zIndex = "4";
        seance.style.cursor = "grabbing";
        startPosition.x = draggable.position.x;
        startPosition.y = draggable.position.y;
      });

      draggable.on("staticClick", () => {
        seance.style.zIndex = "3";
        seance.style.cursor = "grab";
      });

      draggable.on("dragEnd", () => {
        // const rect = seance.getBoundingClientRect();
        // const x = rect.left + rect.width / 2;
        // const y = rect.top + rect.height / 2;
        // @ts-ignore
        draggable.setPosition(startPosition.x, startPosition.y);
        seance.style.zIndex = "3";
        seance.style.cursor = "grab";

        // const releasedOver = document.elementFromPoint(x, y);
        // const bin = releasedOver?.closest(".bin");

        // if (bin) {
        //   console.log(bin);
        // }
      });

      return () => {
        draggable.destroy();
      };
    });
  }, [seancesRef.current, seancesRef.current?.querySelectorAll(".seance")]);

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

            const filmIndex = films.indexOf(curFilm) % 5;

            const { timeStartPercent, timeDurationPercent } = setTimePosition(
              seance.seance_time,
              curFilm.film_duration,
            );

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

  useEffect(() => {}, [seancesGrid]);
  return <ScheduleView seancesGrid={seancesGrid} seancesRef={seancesRef} />;
};
