import { SeancesView } from "./SeancesView";
import { Loader } from "@/components";
import { useParams } from "react-router-dom";
import { useFilterSeances } from "@/hooks";

type TProps = {
	allData: any;
}

export const Seances = ({ allData }: TProps) => {
  const { date } = useParams();

  const { data, error, isLoading } = allData;
  const { films } = useFilterSeances(data, date);

  return (
    <>
      {isLoading && <Loader />}
      {(films || error) && (
        <SeancesView data={films} error={error} date={date as string} />
      )}
    </>
  );
};
