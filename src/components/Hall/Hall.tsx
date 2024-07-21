import { HallView } from "./HallView";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGetAllData } from "@/services";
import { useReservation, useResize } from "@/hooks";
import { TTicket } from "@/models/ReservationModel";
import { Loader } from "@/components";
import classes from "./hall.module.scss";

export const Hall = () => {
  const [ticket, setTicket] = useState<TTicket>({
    seats: "",
    price: "",
  });

  const { isMobile } = useResize();
  const { seanceInfo } = useParams();
  const seanceId = seanceInfo?.split("&")[0];
  const date = seanceInfo?.split("&")[1];
  const time = seanceInfo?.split("&")[2];

  const { data, isLoading } = useGetAllData(
    `hallconfig?seanceId=${seanceId}&date=${date}`,
  );
  const { film, hall } = useReservation(seanceId);

  const seats = data?.result;

  const getTicket = (seats: string, price: string) => {
    setTicket({
      seats: seats,
      price: price,
    });
  };

  return (
    <div>
			{isLoading && <div className={classes['loader']}><Loader /></div>}
      {film && seats && time && hall && date && (
        <HallView
          film={film}
          seats={seats}
          time={time}
          hall={hall}
          isMobile={isMobile}
          getTicket={getTicket}
          ticket={ticket}
					date={date}
        />
      )}
    </div>
  );
};
