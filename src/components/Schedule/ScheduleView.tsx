import { TTimeLine, TCurSeance } from "./Schedule";
import classes from "./schedule.module.scss";

type TProps = {
  seancesGrid: TTimeLine[];
	seancesRef: React.RefObject<HTMLDivElement>;
};

export const ScheduleView = ({
  seancesGrid,
	seancesRef,
}: TProps) => {
  return (
    <div className={classes["schedule"]} ref={seancesRef}>
      {seancesGrid.map((grid: TTimeLine) => (
        <div
          key={grid.hallId}
					id={grid.hallId.toString()}
          className={classes["hall"] + " " + "schedule-hall"}
        >
          <span className={classes["hall-name"]}>{grid.hallName}</span>
          <div className={classes["time-line"]} >
            {grid.timeLine.map((seance: TCurSeance) => (
              <div
                key={seance.id}
                className={classes["seance"] + " " + "seance"}
								data-left={`${seance.startPercent}%`}
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
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
