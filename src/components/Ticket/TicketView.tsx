import classes from "./ticket.module.scss";
import QRCode from "react-qr-code";

type TProps = {
  book: {
    film: string | undefined;
    hall: string | undefined;
    time: string | undefined;
    price: string | undefined;
    seats: string | undefined;
    date: string | undefined;
  };
};

export const TicketView = ({ book }: TProps) => {
  return (
    <div className={classes["ticket"]}>
      <header className={classes["header"]}>
        <h2 className={classes["title"]}>Электронный билет</h2>
      </header>
      <main className={classes["main"]}>
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
        <div className={classes["qr"]}>
          <QRCode
            value={
              "Date: " +
              book.date +
              "\n" +
              "Seance start at: " +
              book.time +
              "\n" +
              "Film: " +
              book.film +
              "\n" +
              "Hall: " +
              book.hall +
              "\n" +
              "Seats: " +
              book.seats +
              "\n" +
              "Price: " +
              book.price +
              " rub" +
              "\n" +
              "The ticket is valid strictly for this seance."
            }
          />
        </div>
        <p className={classes["description"]}>
          Покажите QR-код нашему контроллеру для подтверждения бронирования.
        </p>
        <span className={classes["enjoy"]}>Приятного просмотра!</span>
      </main>
    </div>
  );
};
