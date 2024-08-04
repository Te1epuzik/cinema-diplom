import { HallRemovePopupView } from "./HallRemovePopupView";

type TProps = {
  handlePopup: (event: React.MouseEvent) => void;
  handleCancel: () => void;
	handleDeleteHall: (id: number) => void
  popupRef: React.RefObject<HTMLDivElement>;
  currentHall: { id: number | null; name: string };
};

export const HallRemovePopup = ({
  handlePopup,
  handleCancel,
	handleDeleteHall,
  popupRef,
  currentHall,
}: TProps) => {
  return (
    <HallRemovePopupView
		handleDeleteHall={handleDeleteHall}
		currentHall={currentHall}
      handlePopup={handlePopup}
      handleCancel={handleCancel}
      popupRef={popupRef}
    />
  );
};
