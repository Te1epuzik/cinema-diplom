import { TTimeLine, TCurSeance } from "@/components";
import classes from "./schedule.module.scss";
import { BinSVG } from "@/svg";

type TProps = {
  seancesGrid: TTimeLine[];
  seancesRef: React.RefObject<HTMLDivElement>;
  desktopBin: number | null;
  mobileBin: number | null;
  width: number | null;
};

export const ScheduleView = ({
  seancesGrid,
  seancesRef,
  desktopBin,
  mobileBin,
  width
}: TProps) => {
  return (
    <div className={classes["schedule"]} ref={seancesRef}>
      <span className={classes["hint"]}>
        Чтобы удалить сеанс,{width && width < 768 && <br />} перетащите его в корзину
      </span>
      {seancesGrid.map((grid: TTimeLine) => (
        <div
          key={grid.hallId}
          id={grid.hallId.toString()}
          className={classes["hall"] + " " + "schedule-hall"}
        >
          {mobileBin && mobileBin === grid.hallId && (
            <div
              id={grid.hallId.toString()}
              className={classes["bin-mobile"] + " " + "bin"}
            >
              <BinSVG fill="#63536C" />
            </div>
          )}
          {desktopBin && desktopBin === grid.hallId && (
            <div
              id={grid.hallId.toString()}
              className={classes["bin-desk"] + " " + "bin"}
            >
              <BinSVG />
            </div>
          )}
          <span className={classes["hall-name"]}>{grid.hallName}</span>
          <div className={classes["time-line"]}>
            {grid.timeLine.map((seance: TCurSeance) => (
              <button
                key={seance.id}
                id={seance.id.toString()}
                className={classes["seance"] + " " + "seance"}
                data-film={seance.filmName}
                style={{
                  width: `${seance.widthPercent}%`,
                  left: `${seance.startPercent}%`,
                  backgroundColor: seance.bg,
                  borderColor: seance.border,
                }}
              >
                {seance.widthPercent > 7 && (
                  <span className={classes["film-name"]}>
                    {seance.filmName.slice(0, 8) +
                      (seance.filmName.length > 8 ? "..." : "")}
                  </span>
                )}
                <span className={classes["film-name-vh"]}>
                  {seance.filmName}
                </span>
                <span className={classes["time"]}>{seance.time}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
