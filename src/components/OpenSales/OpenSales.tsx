import { useEffect, useState } from "react";
import { OpenSalesView } from "./OpenSalesView";
import { useOpenSales } from "@/services";
import { THall } from "@/models/SessionsModel";

type TProps = {
  position: "first" | "middle" | "last";
  allData: any;
  availableHalls: { name: string; id: number; hallOpen: 0 | 1 }[];
};

export const OpenSales = ({ position, allData, availableHalls }: TProps) => {
  const [updatedHalls, setUpdatedHalls] = useState<
    { id: number; hallOpen: 0 | 1 }[]
  >([]);
  const [currentHall, setCurrentHall] = useState<number>(0);
	const [isOpened, setIsOpened] = useState<1 | 0>(0);
  const { data, isLoading, fetchData } = useOpenSales();

  useEffect(() => {
    if (!data || !data.success) {
      return;
    }

		const usedHall = data.result.halls.find((hall: THall) => hall.id === currentHall);
		setIsOpened(usedHall.hall_open)

    if (updatedHalls.find((hall) => hall.id === currentHall)) {
      setUpdatedHalls((prev) => prev.map((hall) => {
				if (hall.id === currentHall) {
					return {
						...hall,
						hallOpen: usedHall.hall_open,
					}
				}
				return hall
			}));
    } else {
			setUpdatedHalls((prev) => [...prev, {
				id: currentHall,
				hallOpen: usedHall.hall_open,
			}]);
		}

  }, [data]);

  const handleOpenSales = () => {
    const params = new FormData();
    params.set("hallOpen", "1");
    fetchData(currentHall, params);
  };

  const handleCloseSales = () => {
    const params = new FormData();
    params.set("hallOpen", "0");
    fetchData(currentHall, params);
  };

  useEffect(() => {
    if (availableHalls.length === 0) {
      return;
    }
    setCurrentHall(availableHalls[0].id);
		setIsOpened(availableHalls[0].hallOpen)
  }, [availableHalls]);

	useEffect(() => {
		if (currentHall === 0 || availableHalls.length === 0) {
			return;
		}

		const usedHall = updatedHalls.find((hall) => hall.id === currentHall);

		if (usedHall) {
			setIsOpened(usedHall.hallOpen);
			return;
		}

		const status = availableHalls.find((hall) => hall.id === currentHall)?.hallOpen
		if (status) {
			setIsOpened(status)
		}
	}, [currentHall])

  const handleChooseHall = (id: number) => {
    setCurrentHall(id);
  };

  return (
    <OpenSalesView
      position={position}
      allData={allData}
      availableHalls={availableHalls}
      handleChooseHall={handleChooseHall}
      currentHall={currentHall}
      handleOpenSales={handleOpenSales}
      handleCloseSales={handleCloseSales}
      isLoading={isLoading}
			isOpened={isOpened}
    />
  );
};
