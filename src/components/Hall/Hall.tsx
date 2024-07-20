import { HallView } from "./HallView";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getSeancesData } from "@/services";
import { useReservation, useResize } from "@/hooks";
import { TTicket } from "@/models/ReservationModel";

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

  const { data } = getSeancesData(
    `https://shfe-diplom.neto-server.ru/hallconfig?seanceId=${seanceId}&date=${date}`,
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
    film &&
    seats &&
    time &&
    hall && (
      <HallView
        film={film}
        seats={seats}
        time={time}
        hall={hall}
        isMobile={isMobile}
				getTicket={getTicket}
				ticket={ticket}
      />
    )
  );
};
