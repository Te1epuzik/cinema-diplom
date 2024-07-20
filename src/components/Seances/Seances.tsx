import { SeancesView } from "./SeancesView";
import { getSeancesData } from "@/services";
import { Loader } from "@/components";
import { useParams } from "react-router-dom";
import { useFilterSeances } from "@/hooks";

export const Seances = () => {
  const { date } = useParams();

  const { data, error, isLoading } = getSeancesData(
    "https://shfe-diplom.neto-server.ru/alldata",
  );

  const { films } = useFilterSeances(data);

  console.log(films);

  return (
    <>
      {isLoading && <Loader />}
      {(films || error) && (
        <SeancesView data={films} error={error} date={date as string} />
      )}
    </>
  );
};
