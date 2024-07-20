import { SeatsView } from "./SeatsView";
import { useState, useEffect } from "react";

type TProps = {
  seats: string[][];
  getTicket: (seats: string, price: string) => void;
};

export const Seats = ({ seats, getTicket }: TProps) => {
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

  console.log(seats);

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
    let places: number[] = [];

    for (let i = 0; i < seats.length; i++) {
      for (let j = 0; j < seats[i].length; j++) {
        seatNumber++;
        if (selectedSeats[i][j]) {
          switch (seats[i][j]) {
            case "standart":
              price += 250;
              break;
            case "vip":
              price += 350;
              break;
          }
          places.push(seatNumber);
        }
      }
    }
    console.log(places, price);

    getTicket(places.join(","), price.toString());
	}, [selectedSeats]);

  return (
    <SeatsView
      seats={seats}
      selectedSeats={selectedSeats}
      handleSelectSeat={handleSelectSeat}
    />
  );
};
