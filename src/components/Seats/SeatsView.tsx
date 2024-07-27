import classes from "./seats.module.scss";
import { v4 } from "uuid";

import screenPNG from "@/assets/Экран.png";

type TProps = {
  seats: string[][];
  handleSelectSeat: (i: number, j: number) => void;
  selectedSeats: boolean[][];
  prices: { standart: number; vip: number };
  handleDoubleTouch: (event: React.TouchEvent<HTMLDivElement>) => void;
};

export const SeatsView = ({
  seats,
  handleSelectSeat,
  selectedSeats,
  prices,
  handleDoubleTouch,
}: TProps) => {
  return (
    <div className={classes["seats"]} onTouchStart={handleDoubleTouch}>
      <div className={classes["screen"]}>
        <img className={classes["screen-svg"]} src={screenPNG} alt="Экран" />
      </div>
      <div className={classes["grid"]}>
        {seats.map((row, i) => (
          <div key={v4()} className={classes["row"]}>
            {row.map((seat, j) => (
              <div
                key={v4()}
                className={
                  selectedSeats[i][j]
                    ? classes[seat] + " " + classes["selected"]
                    : classes[seat]
                }
                onClick={() => handleSelectSeat(i, j)}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className={classes["legend"]}>
        <div className={classes["legend-item"]}>
          <div className={classes["standart"]}></div>
          <span
            className={classes["legend-text"]}
          >{`Свободно (${prices.standart}руб)`}</span>
        </div>
        <div className={classes["legend-item"]}>
          <div className={classes["taken"]}></div>
          <span className={classes["legend-text"]}>{"Занято"}</span>
        </div>
        <div className={classes["legend-item"]}>
          <div className={classes["vip"]}></div>
          <span className={classes["legend-text"]}>
            {`Свободно VIP (${prices.vip}руб)`}
          </span>
        </div>
        <div className={classes["legend-item"]}>
          <div className={classes["selected"]}></div>
          <span className={classes["legend-text"]}>{"Выбрано"}</span>
        </div>
      </div>
    </div>
  );
};
