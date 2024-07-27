import { ConfigPriceView } from "./ConfigPriceView";
import { useEffect, useState } from "react";
import { useSetPrice } from "@/services";

type TProps = {
  position: "first" | "middle" | "last";
  allData: any;
  availableHalls: { name: string; id: number }[];
};

export const ConfigPrice = ({ position, availableHalls, allData }: TProps) => {
  const [currentHall, setCurrentHall] = useState<number>(0);
  const [changedPrices, setChangedPrices] = useState<
    { hallId: number; standart: string; vip: string }[]
  >([]);
  const [currentPrices, setCurrentPrices] = useState<{
    standart: string;
    vip: string;
  }>({ standart: "100", vip: "100" });
	const [success, setSuccess] = useState<boolean>(false);

  const { data, error, isLoading, fetchData } = useSetPrice();

	useEffect(() => {
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
	}, [data])

  const handleCancelChanges = () => {
    const hall = allData?.data?.result?.halls.find(
      (hall: any) => hall.id === currentHall,
    );
    const priceData =
      changedPrices.find((price) => price.hallId === currentHall) ||
      (hall && {
        hallId: currentHall,
        standart: hall?.hall_price_standart,
        vip: hall?.hall_price_vip,
      });

    if (priceData) {
      setCurrentPrices({
        standart: priceData.standart,
        vip: priceData.vip,
      });
    } else {
      setCurrentPrices({
        standart: "100",
        vip: "100",
      });
    }
  };

  useEffect(() => {
    if (availableHalls.length === 0) {
      return;
    }
    setCurrentHall(availableHalls[0].id);
  }, [availableHalls]);

  const handleSubmit = () => {
    setChangedPrices((prev) => {
      if (!prev.find((price) => price.hallId === currentHall)) {
        return [
          ...prev,
          {
            hallId: currentHall,
            standart: currentPrices.standart,
            vip: currentPrices.vip,
          },
        ];
      }

      const prevPrices = prev.filter((price) => price.hallId !== currentHall);

      return [
        ...prevPrices,
        {
          hallId: currentHall,
          standart: currentPrices.standart,
          vip: currentPrices.vip,
        },
      ];
    });

    const params = new FormData();

    params.set("priceStandart", currentPrices.standart);
    params.set("priceVip", currentPrices.vip);

    fetchData(currentHall, params);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCurrentPrices((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (currentHall === 0 || !allData.data || !allData.data.success) {
      return;
    }

    const priceAllData = allData.data.result.halls.find(
      (hall: any) => hall.id === currentHall,
    );
    const priceData =
      changedPrices.find((price) => price.hallId === currentHall) ||
      (priceAllData && {
        hallId: currentHall,
        standart: priceAllData?.hall_price_standart,
        vip: priceAllData?.hall_price_vip,
      });

    if (priceData) {
      setCurrentPrices({
        standart: priceData.standart,
        vip: priceData.vip,
      });
    } else {
      setCurrentPrices({
        standart: "100",
        vip: "100",
      });
    }
  }, [currentHall]);

  const handleChooseHall = (id: number) => {
    setCurrentHall(id);
  };

  return (
    <ConfigPriceView
      position={position}
      availableHalls={availableHalls}
      currentHall={currentHall}
      handleChooseHall={handleChooseHall}
      currentPrices={currentPrices}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleCancelChanges={handleCancelChanges}
      isLoading={isLoading}
      error={error}
			success={success}
    />
  );
};
