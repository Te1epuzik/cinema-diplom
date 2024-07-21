import classes from "./book.module.scss";
import { Link } from "react-router-dom";

type TProps = {
	filmId: string;
  book: {
    film: string | undefined;
    hall: string | undefined;
    time: string | undefined;
    price: string | undefined;
    seats: string | undefined;
		date: string | undefined;
  };
};

export const BookView = ({ book, filmId }: TProps) => {
  return (
    <div className={classes["book"]}>
      <header className={classes["header"]}>
        <h2 className={classes["title"]}>Вы выбрали билеты:</h2>
      </header>
      <div className={classes["content"]}>
        <div className={classes["seance"]}>
          <span className={classes["info"]}>
            На фильм: <span className={classes["info-inner"]}>{book.film}</span>
          </span>
          <span className={classes["info"]}>
            Места: <span className={classes["info-inner"]}>{book.seats}</span>
          </span>
          <span className={classes["info"]}>
            В зале: <span className={classes["info-inner"]}>{book.hall}</span>
          </span>
          <span className={classes["info"]}>
            Начало сеанса:{" "}
            <span className={classes["info-inner"]}>{book.time}</span>
          </span>
          <span className={classes["info"]}>
            Стоимость:{" "}
            <span className={classes["info-inner"]}>{book.price}</span> рублей
          </span>
        </div>
        <Link
          className={classes["get-code"] + " " + "button"}
          to={
            "/client/payment/ticket/" +
						filmId +
            "&" +
            book.hall +
            "&" +
            book.time +
            "&" +
            book.price +
            "&" +
            book.seats?.split(", ").join(",") +
						"&" +
						book.date
          }
        >
          Получить код бронирования
        </Link>
        <p className={classes["description"]}>
          После оплаты билет будет доступен в этом окне, а также придёт вам на
          почту. Покажите QR-код нашему контроллёру у входа в зал.
        </p>
        <span className={classes["enjoy"]}>Приятного просмотра!</span>
      </div>
    </div>
  );
};
