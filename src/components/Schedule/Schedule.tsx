import { TFilm, TSeance } from "@/models/SessionsModel";
import { ScheduleView } from "./ScheduleView";
import { useResize } from "@/hooks";
import { useEffect, useRef, useState } from "react";
import Draggabilly from "draggabilly";

type TProps = {
  availableHalls: { name: string; id: number }[];
  allData: any;
  seancesGrid: TTimeLine[];
  setSeancesGrid: React.Dispatch<React.SetStateAction<TTimeLine[]>>;
  setDeleteSeance: React.Dispatch<
    React.SetStateAction<{
      trigger: boolean;
      id: number | null;
      film: string;
      hallId: number | null;
    }>
  >;
};

type TCurSeance = {
  id: number;
  filmName: string;
  widthPercent: number;
  startPercent: number;
  bg: string;
  border: string;
  time: string;
};

type TTimeLine = {
  hallId: number;
  hallName: string;
  timeLine: TCurSeance[];
};

export const Schedule = ({
  availableHalls,
  allData,
  seancesGrid,
  setSeancesGrid,
  setDeleteSeance,
}: TProps) => {
  const [desktopBin, setDesktopBin] = useState<number | null>(null);
  const [mobileBin, setMobileBin] = useState<number | null>(null);
  const seancesRef = useRef<HTMLDivElement>(null);
  const { isMobile, isTablet, width } = useResize();

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
      const sessionGrid = document.querySelector("#session-grid1");
      const schedule = seance.parentElement?.parentElement;

      if (
        !(seance instanceof HTMLElement) ||
        !schedule ||
        !(schedule instanceof HTMLElement) ||
        !sessionGrid ||
        !(sessionGrid instanceof HTMLElement)
      ) {
        return;
      }

      const startPosition = {
        left: seance.style.left,
        top: seance.style.top,
      };

      draggable.on("pointerDown", () => {
        seance.style.zIndex = "4";
        seance.style.cursor = "grabbing";
				sessionGrid.style.cursor = "grabbing";
      });

      draggable.on("staticClick", () => {
        seance.style.zIndex = "3";
        seance.style.cursor = "grab";
        if (isTablet) {
          seance.focus();
        }
				sessionGrid.style.cursor = "default";
      });

      draggable.on("dragStart", () => {
        const currentHallId = schedule.getAttribute("id");

        if (isMobile) {
          setMobileBin(Number(currentHallId) || null);
          setDesktopBin(null);
					seance.style.top = "-70px";
        } else {
          setDesktopBin(Number(currentHallId) || null);
          setMobileBin(null);
        }
      });

      draggable.on(
        "pointerUp",
        (_event: Event, pointer: MouseEvent | Touch) => {
          seance.style.pointerEvents = "none";
          const releasedOver = document.elementFromPoint(
            pointer.clientX,
            pointer.clientY,
          );
					sessionGrid.style.cursor = "default";
          seance.style.pointerEvents = "auto";
          const bin = releasedOver?.closest(".bin");

          if (bin) {
            setDeleteSeance({
              trigger: true,
              id: Number(seance.getAttribute("id")),
              film: seance.getAttribute("data-film") as string,
              hallId: Number(bin.getAttribute("id")),
            });
            console.log(bin);
          }
        },
      );

      draggable.on("dragEnd", () => {
        setDesktopBin(null);
        setMobileBin(null);
        seance.style.left = startPosition.left;
        seance.style.top = startPosition.top;
        seance.style.zIndex = "3";
        seance.style.cursor = "grab";
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
  return (
    <ScheduleView
      seancesGrid={seancesGrid}
      seancesRef={seancesRef}
      desktopBin={desktopBin}
      mobileBin={mobileBin}
      width={width}
    />
  );
};
