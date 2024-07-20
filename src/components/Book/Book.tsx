import { BookView } from "./BookView";
import { useParams } from "react-router-dom";
import { getSeancesData } from "@/services";
import { TFilm } from "@/models/SessionsModel";

export const Book = () => {
	const { bookInfo } = useParams();

	const book = bookInfo?.split("&");
	
	const { data } = getSeancesData(`https://shfe-diplom.neto-server.ru/alldata`);
	
	const bookObj = {
		film: book && data?.result?.films.find((film: TFilm) => film.id === +book[0]).film_name,
		hall: book && book[1],
		time: book && book[2],
		price: book && book[3],
		seats: book && book[4].split(",").join(", "),
	}

	console.log(bookObj);

  return book && bookObj && <BookView book={bookObj} filmId={book[0]} />;
};
