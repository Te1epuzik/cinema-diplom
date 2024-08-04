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
  const [deleteHall, setDeleteHall] = useState<boolean>(false);
  const [currentHall, setCurrentHall] = useState<{id: number | null, name: string }>({
		id: null,
		name: "",
	});
  const [createHall, setCreateHall] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleDeleteHallPopup = (event: MouseEvent, hallId?: number, hallName?: string) => {
    if (
      popupRef &&
      popupRef.current &&
      popupRef.current.contains(event.target as Node)
    ) {
      return;
    }
    if (hallId && hallName) {
      setCurrentHall({
				id: hallId,
				name: hallName,
			});
    } else {
			setCurrentHall({
				id: null,
				name: "",
			});
		}
    setDeleteHall(!deleteHall);
  };

  const handleHallPopup = (event: MouseEvent) => {
    if (
      popupRef &&
      popupRef.current &&
      popupRef.current.contains(event.target as Node)
    ) {
      return;
    }
    setCreateHall(!createHall);
  };

  const handleCancel = () => {
    if (createHall) {
      setCreateHall(false);
    } else if (deleteHall) {
      setDeleteHall(false);
    }
  };

  return (
    <SettingHallsView
      position={position}
      availableHalls={availableHalls}
      createHall={createHall}
      handleHallPopup={handleHallPopup}
      handleDeleteHallPopup={handleDeleteHallPopup}
			currentHall={currentHall}
      handleCancel={handleCancel}
      setHall={setHall}
      deleteHall={deleteHall}
      setCreateHall={setCreateHall}
      handleDeleteHall={handleDeleteHall}
      popupRef={popupRef}
    />
  );
};
