import { ConfigHallsView } from "./ConfigHallsView";
import { useEffect, useState } from "react";
import { useConfigHall } from "@/services";

type TProps = {
  position: "first" | "middle" | "last";
  availableHalls: { name: string; id: number }[];
  allData: any;
};

export const ConfigHalls = ({ position, availableHalls, allData }: TProps) => {
  const [currentHall, setCurrentHall] = useState<number>(0);
  const [row, setRow] = useState(10);
  const [col, setCol] = useState(10);
  const [seats, setSeats] = useState<string[][]>([]);
  const [updatedSeats, setUpdatedSeats] = useState<
    { id: number; seats: string[][] }[]
  >([]);
	const [success, setSuccess] = useState<boolean>(false);
  const ConfigHall = useConfigHall();

  const hendlersNums = {
    rowInc: () => {
      setRow((prev) => {
        if (prev === 12) {
          return prev;
        }
        return prev + 1;
      });
    },
    rowDec: () => {
      setRow((prev) => {
        if (prev === 5) {
          return prev;
        }
        return prev - 1;
      });
    },
    colInc: () => {
      setCol((prev) => {
        if (prev === 12) {
          return prev;
        }
        return prev + 1;
      });
    },
    colDec: () => {
      setCol((prev) => {
        if (prev === 5) {
          return prev;
        }
        return prev - 1;
      });
    },
  };

  useEffect(() => {
		if (availableHalls.length === 0) {
			return;
		}
    setCurrentHall(availableHalls[0].id);
  }, [availableHalls]);

	useEffect(() => {
		const { data } = ConfigHall;
		let timeoutId : number;
		if (data && data.success) {
			setSuccess(true);
			timeoutId = setTimeout(() => {
				setSuccess(false)
			}, 4000)
		}

		return () => {
			clearTimeout(timeoutId)
		}
	}, [ConfigHall.data])

  const handleSubmitChanges = (config: string[][]) => {
    setSeats(config);
    setUpdatedSeats((prev) => {
      if (prev.find((seat) => seat.id === currentHall)) {
        prev.map((seat) => seat.id !== currentHall);
      }

      return [
        ...prev,
        {
          id: currentHall,
          seats: config,
        },
      ];
    });
    const params = new FormData();
    params.set("rowCount", config.length.toString());
    params.set("placeCount", config[0].length.toString());
    params.set("config", JSON.stringify(config));

    ConfigHall.fetchData(currentHall, params);
  };

  useEffect(() => {
    if (ConfigHall.data && ConfigHall.data.result) {
      setUpdatedSeats((prev) => [
        ...prev,
        {
          id: ConfigHall.data.result.hall_id,
          seats: ConfigHall.data.result.hall_config,
        },
      ]);
    }
  }, [ConfigHall.data]);

  useEffect(() => {
    if (currentHall === 0) {
			return;
    }

    const seatsData =
      updatedSeats.find((seat) => seat.id === currentHall)?.seats ||
      allData?.data?.result?.halls.find((hall: any) => hall.id === currentHall)
        ?.hall_config;

    if (seatsData) {
      setSeats(seatsData);
      setRow(seatsData.length);
      setCol(seatsData[0].length);
    } else {
      setSeats(() => {
        const newSeats: string[][] = [];
        for (let i = 0; i < 10; i++) {
          newSeats.push([]);
          for (let j = 0; j < 10; j++) {
            newSeats[i].push("standart");
          }
        }
        return newSeats;
      });
    }
  }, [currentHall]);

  const handleChangeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "row") {
      setRow(Number(value));
    } else {
      setCol(Number(value));
    }
  };

  const handleChooseHall = (id: number) => {
    setCurrentHall(id);
  };

  return (
    <ConfigHallsView
      position={position}
      availableHalls={availableHalls}
      handleChooseHall={handleChooseHall}
      currentHall={currentHall}
      handleChangeSize={handleChangeSize}
      row={row}
      col={col}
      seats={seats}
      handleSubmitChanges={handleSubmitChanges}
      ConfigHall={ConfigHall}
      hendlersNums={hendlersNums}
			success={success}
    />
  );
};
