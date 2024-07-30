import { TTimeLine, TCurSeance } from "./Schedule";
import classes from "./schedule.module.scss";

type TProps = {
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  seancesGrid: TTimeLine[];
};

export const ScheduleView = ({
  handleDrop,
  handleDragOver,
  seancesGrid,
}: TProps) => {
  return (
    <div className={classes["schedule"]}>
      {seancesGrid.map((grid: TTimeLine) => (
        <div
          key={grid.hallId}
          className={classes["hall"]}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <span className={classes["hall-name"]}>{grid.hallName}</span>
          <div className={classes["time-line"]}>
            {grid.timeLine.map((seance: TCurSeance) => (
              <div
                draggable
                key={seance.id}
                className={classes["seance"]}
                style={{
                  width: `${seance.widthPercent}%`,
                  left: `${seance.startPercent}%`,
                  backgroundColor: seance.bg,
                  borderColor: seance.border,
                }}
              >
                {seance.filmName}
                <span className={classes["time"]}>{seance.time}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
