import { TFilm } from "@/models/SessionsModel";
import classes from "./hall.module.scss";
import { TTickets } from "@/models/ReservationModel";

import hintSVG from "@/assets/hint.svg";

import { Seats } from "@/components";

type TProps = {
  film: TFilm;
  seats: string[][];
  time: string;
  hall: string;
  isTablet: boolean;
  tickets: TTickets;
  date: string;
  prices: { standart: number; vip: number };
  handleReserveSeats: () => void;
  getTicket: (ticket: {row: number; coast: string; place: number}[]) => void;
	finalCoast: number;
};

export const HallView = ({
  film,
  seats,
  time,
  hall,
  isTablet,
  getTicket,
  tickets,
  prices,
  handleReserveSeats,
}: TProps) => {
  return (
    <div className={classes["hall"]}>
      <header className={classes["header"]}>
        <div className={classes["film-info"]}>
          <h2 className={classes["name"]}>{film.film_name}</h2>
          <span className={classes["time-start"]}>Начало сеанса: {time}</span>
          <span className={classes["hall-name"]}>{hall}</span>
        </div>
        {isTablet && (
          <div className={classes["hint"]}>
            <img
              className={classes["hint-svg"]}
              src={hintSVG}
              alt="Подсказка"
            />
            <span className={classes["hint-description"]}>
              Тапните дважды, чтобы увеличить
            </span>
          </div>
        )}
      </header>
      <Seats seats={seats} getTicket={getTicket} prices={prices} />
      <button
        onClick={handleReserveSeats}
        className={
          (tickets.length < 1
            ? classes["book"] + " " + classes["book-disabled"]
            : classes["book"]) +
          " " +
          "button"
        }
      >
        Забронировать
      </button>
    </div>
  );
};
