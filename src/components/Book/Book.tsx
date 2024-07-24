import { BookView } from "./BookView";
import { useParams } from "react-router-dom";
import { useGetAllData } from "@/services";
import { TFilm } from "@/models/SessionsModel";
import { Loader } from "@/components";

export const Book = () => {
  const { bookInfo } = useParams();

  const book = bookInfo?.split("&");

  const { data, isLoading } = useGetAllData();

  const bookObj = {
    film:
      book &&
      data?.result?.films.find((film: TFilm) => film.id === +book[0]).film_name,
    hall: book && book[1],
    time: book && book[2],
    price: book && book[3],
    seats: book && book[4].split(",").map(seat => {
			const places = seat.split(":");

			return `ряд ${places[0]} место ${places[1]}`
		}).join(", "),
		date: book && book[5],
  };

  console.log(bookObj);

  return <> 
	{isLoading && <Loader />}
	{book && bookObj && data && <BookView book={bookObj} filmId={book[0]} />}</>;
};
