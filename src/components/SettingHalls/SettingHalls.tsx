import { SettingHallsView } from "./SettingHallsView";
import { useState, MouseEvent } from "react";

type TProps = {
  position: "first" | "middle" | "last";
  allData: any;
	handleDeleteHall: (id: number) => void;
	setHall: any;
	availableHalls: { name: string; id: number }[];
};

export const SettingHalls = ({
  position,
	availableHalls,
	handleDeleteHall,
	setHall,
}: TProps) => {
  const [createHall, setCreateHall] = useState<boolean>(false);
  
  const handleHallPopup = (event: MouseEvent) => {
    const popup = document.querySelector(".popup");
    if (popup && popup.contains(event.target as Node)) {
      return;
    }
    setCreateHall(!createHall);
  };

  const handleCancel = () => {
    setCreateHall(false);
  };


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
