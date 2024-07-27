import { useResize } from "@/hooks";
import { SeatsView } from "./SeatsView";
import { useState, useEffect } from "react";

type TProps = {
  seats: string[][];
  prices: { standart: number; vip: number };
  getTicket: (ticket: { row: number; coast: string; place: number }[]) => void;
};

export const Seats = ({ seats, getTicket, prices }: TProps) => {
  const [selectedSeats, setSelectedSeats] = useState<boolean[][]>(() => {
    const initialSelectedSeats: boolean[][] = [];
    for (let i = 0; i < seats.length; i++) {
      initialSelectedSeats.push([]);
      for (let j = 0; j < seats[i].length; j++) {
        initialSelectedSeats[i].push(false);
      }
    }

    return initialSelectedSeats;
  });
	const [secondTouch, setSecondTouch] = useState<boolean>(false);
  const { isTablet } = useResize();

	const handleDoubleTouch = (event: React.TouchEvent<HTMLDivElement>) => {
		if (!isTablet) {
			return;
		}

		if (!secondTouch) {
			setSecondTouch(true);
			setTimeout(() => {
				setSecondTouch(false);
			}, 300);
		} else {
			setSecondTouch(false);

			if (event.target instanceof HTMLDivElement) {
				event.target.classList.toggle("zoomed");
			}
		}
	}

  const handleSelectSeat = (i: number, j: number) => {
    if (seats[i][j] === "disabled" || seats[i][j] === "taken") {
      return;
    }

    setSelectedSeats((prev) => {
      const newSelectedSeats = prev.map((row, rowI) =>
        rowI === i
          ? row.map((value, colI) =>
              rowI === i && colI === j ? !value : value,
            )
          : row,
      );

      return newSelectedSeats;
    });
  };

  useEffect(() => {
    let seatNumber: number = 0;
    let price: number = 0;
    let tickets: { row: number; place: number; coast: string }[] = [];

    for (let i = 0; i < seats.length; i++) {
      for (let j = 0; j < seats[i].length; j++) {
        seatNumber++;
        if (selectedSeats[i][j]) {
          switch (seats[i][j]) {
            case "standart":
              price = prices.standart;
              break;
            case "vip":
              price = prices.vip;
              break;
          }
          tickets.push({
            row: i + 1,
            coast: price.toString(),
            place: j + 1,
          });
        }
      }
    }

    getTicket(tickets);
  }, [selectedSeats]);

  return (
    <SeatsView
      seats={seats}
      selectedSeats={selectedSeats}
      handleSelectSeat={handleSelectSeat}
      prices={prices}
			handleDoubleTouch={handleDoubleTouch}
    />
  );
};
