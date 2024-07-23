import { SettingHallsView } from "./SettingHallsView";
import { useState, useEffect, MouseEvent } from "react";
import { useSetHall } from "@/services";
import { THall } from "@/models/SessionsModel";

type TProps = {
  position: "first" | "midle" | "last";
	allData: any;
};

export const SettingHalls = ({ position, allData }: TProps) => {
  const [createHall, setCreateHall] = useState<boolean>(false);
	const setHall = useSetHall();
  const [availableHalls, setAvailableHalls] = useState<
    { name: string; id: number }[]
  >([]);

	useEffect(() => {
		if (setHall.data && setHall.data.result && setHall.data.result.halls) {
      setAvailableHalls(
        setHall.data.result.halls.map((hall: THall) => {
          return { name: hall.hall_name, id: hall.id };
        }),
      );
    }

		console.log(setHall.data)

	}, [setHall.data])

  useEffect(() => {
    if (allData.data && allData.data.result && allData.data.result.halls) {
      setAvailableHalls(
        allData.data.result.halls.map((hall: THall) => {
          return { name: hall.hall_name, id: hall.id };
        }),
      );
    }
  }, [allData.data]);

  const handleHallPopup = (event: MouseEvent) => {
		const popup = document.querySelector(".popup");
    if (
      popup && popup.contains(event.target as Node)
    ) {
			return;
    }
    setCreateHall(!createHall);
  };

	const handleCancel = () => {
		setCreateHall(false);
	}

	const handleDeleteHall = (id: number) => {
		setHall.fetchData({
			method: "delete",
			hallId: id,
		})
	}

  return (
    <SettingHallsView
      position={position}
      availableHalls={availableHalls}
      createHall={createHall}
      handleHallPopup={handleHallPopup}
			handleCancel={handleCancel}
			setHall={setHall}
			setCreateHall={setCreateHall}
			handleDeleteHall={handleDeleteHall}
    />
  );
};
