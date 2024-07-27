import { HallView } from "./HallView";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetAllData, useReserveSeats } from "@/services";
import { useReservation, useResize } from "@/hooks";
import { TTickets } from "@/models/ReservationModel";
import { Loader } from "@/components";
import classes from "./hall.module.scss";
import { THall, TSeance } from "@/models/SessionsModel";

type TProps = {
  allData: any;
};

export const Hall = ({ allData }: TProps) => {
  const [prices, setPrices] = useState<{ standart: number; vip: number }>({
    standart: 0,
    vip: 0,
  });
  const [finalCoast, setFinalCoast] = useState(0);
  const [tickets, setTickets] = useState<TTickets>([]);

  const reserveSeats = useReserveSeats();
  const navigate = useNavigate();

  const { isTablet } = useResize();
  const { seanceInfo } = useParams();
  const seanceId = seanceInfo?.split("&")[0];
  const date = seanceInfo?.split("&")[1];
  const time = seanceInfo?.split("&")[2];

  useEffect(() => {
    console.log(allData.data?.result);
    if (
      !allData.data ||
      !allData.data.result ||
      !allData.data.result.halls ||
      !seanceId
    ) {
      return;
    }

    const data = allData.data.result;

    const hallId = data.seances.find((seance: TSeance) => {
      return seance.id === +seanceId;
    }).seance_hallid;

    console.log(hallId);

    setPrices({
      standart: data.halls.find((hall: THall) => hall.id === hallId)
        .hall_price_standart,
      vip: data.halls.find((hall: THall) => hall.id === hallId).hall_price_vip,
    });
  }, [allData.data, seanceId]);

  const { data, isLoading } = useGetAllData(
    `hallconfig?seanceId=${seanceId}&date=${date}`,
  );
  const { film, hall } = useReservation(seanceId);

  const seats = data?.result;

  const getTicket = (
    ticket: { row: number; place: number; coast: string }[],
  ) => {
    setTickets(
      ticket.map((t) => ({
        row: t.row,
        coast: t.coast,
        place: t.place,
      })),
    );
  };

  useEffect(() => {
    setFinalCoast(
      tickets.map((ticket) => ticket.coast).reduce((a, b) => +a + +b, 0),
    );
  }, [tickets]);

  const handleReserveSeats = () => {
    if (!seanceId || !date) {
      return;
    }

    const params = new FormData();
    params.set("seanceId", seanceId);
    params.set("ticketDate", date);
    params.set("tickets", JSON.stringify(tickets));

    reserveSeats.fetchData(params);
  };

  useEffect(() => {
    if (reserveSeats.data && reserveSeats.data.success && film) {
      navigate(
        "/client/payment/" +
          film.id +
          "&" +
          hall +
          "&" +
          time +
          "&" +
          finalCoast +
          "&" +
          tickets.map((ticket) => ticket.row + ":" + ticket.place).join(",") +
          "&" +
          date,
      );
    }
    console.log(reserveSeats.data);
  }, [reserveSeats.data]);

  return (
    <div>
      {isLoading && (
        <div className={classes["loader"]}>
          <Loader />
        </div>
      )}
      {film && seats && time && hall && date && prices && (
        <HallView
          film={film}
          seats={seats}
          time={time}
          hall={hall}
          isTablet={isTablet}
          getTicket={getTicket}
          tickets={tickets}
          date={date}
          prices={prices}
          handleReserveSeats={handleReserveSeats}
          finalCoast={finalCoast}
        />
      )}
    </div>
  );
};
