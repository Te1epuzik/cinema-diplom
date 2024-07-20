import { TFilm } from "@/models/SessionsModel";
import classes from "./hall.module.scss";
import { Link } from "react-router-dom";
import { TTicket } from "@/models/ReservationModel";

import hintSVG from "@/assets/hint.svg";

import { Seats } from "@/components";

type TProps = {
  film: TFilm;
  seats: string[][];
  time: string;
  hall: string;
  isMobile: boolean;
  getTicket: (seats: string, price: string) => void;
  ticket: TTicket;
	date: string;
};

export const HallView = ({
  film,
  seats,
  time,
  hall,
  isMobile,
  getTicket,
  ticket,
	date
}: TProps) => {
  return (
    <div className={classes["hall"]}>
      <header className={classes["header"]}>
        <div className={classes["film-info"]}>
          <h2 className={classes["name"]}>{film.film_name}</h2>
          <span className={classes["time-start"]}>Начало сеанса: {time}</span>
          <span className={classes["hall-name"]}>{hall}</span>
        </div>
        {isMobile && (
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
      <Seats seats={seats} getTicket={getTicket} />
      <Link
        className={
          (ticket.seats.length < 1
            ? classes["book"] + " " + classes["book-disabled"]
            : classes["book"]) + " " + "button"
        }
        to={
          "/client/payment/" +
          film.id +
          "&" +
          hall +
          "&" +
          time +
          "&" +
          ticket.price +
          "&" +
          ticket.seats +
					"&" +
					date
        }
      >
        Забронировать
      </Link>
    </div>
  );
};
