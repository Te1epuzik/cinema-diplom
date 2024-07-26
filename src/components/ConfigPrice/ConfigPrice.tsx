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
  }>({ standart: "0", vip: "0" });

  const { error, isLoading, fetchData } = useSetPrice();

  const handleSubmit = () => {
		const params = new FormData();

		params.set("priceStandart", currentPrices.standart);
		params.set("priceVip", currentPrices.vip);

		fetchData(currentHall, params)
	};

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(value);

    setCurrentPrices((prev) => ({ ...prev, [name]: value }));

  };
	
	useEffect(() => {
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
				}
			]
		});
	}, [currentPrices]) 

  useEffect(() => {
    if (currentHall === 0 || !allData.data || !allData.data.success) {
      return;
    }

		const savedPrices = changedPrices.find(price => price.hallId === currentHall);

		if (savedPrices) {
			setCurrentPrices({
				standart: savedPrices.standart,
				vip: savedPrices.vip,
			})

			return;
		}

    const hall = allData.data.result.halls.find(
      (hall: any) => hall.id === currentHall,
    );

    setCurrentPrices({
      standart: hall.hall_price_standart,
      vip: hall.hall_price_vip,
    });
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
			isLoading={isLoading}
			error={error}
    />
  );
};
