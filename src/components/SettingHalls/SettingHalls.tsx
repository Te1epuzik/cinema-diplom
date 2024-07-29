import { SettingHallsView } from "./SettingHallsView";
import { useState, MouseEvent, useRef } from "react";

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
	const popupRef = useRef<HTMLDivElement>(null)

  const handleHallPopup = (event: MouseEvent) => {
    if (popupRef && popupRef.current && popupRef.current.contains(event.target as Node)) {
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
			popupRef={popupRef}
    />
  );
};
