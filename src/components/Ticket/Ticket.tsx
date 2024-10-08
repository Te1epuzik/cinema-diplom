import { TicketView } from "./TicketView";
import { useParams } from "react-router-dom";
import { TFilm } from "@/models/SessionsModel";
import { Loader } from "@/components";

type TProps = {
  allData: any;
};

export const Ticket = ({ allData }: TProps) => {
  const { bookInfo } = useParams();

  const book = bookInfo?.split("&");

  const { data, isLoading } = allData;

  const bookObj = {
    film:
      book &&
      data?.result?.films.find((film: TFilm) => film.id === +book[0]).film_name,
    hall: book && book[1],
    time: book && book[2],
    price: book && book[3],
    seats: book && book[4].split(",").join(", "),
    date: book && book[5].split("-").join("."),
  };

  console.log(bookObj);

  return (
    <>
      {isLoading && <Loader />}
      {book && bookObj && data && <TicketView book={bookObj} />}
    </>
  );
};
