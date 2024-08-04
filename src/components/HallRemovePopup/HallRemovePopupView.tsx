import classes from "./hallRemovePopup.module.scss";
import { Popup } from "@/components";

type TProps = {
  handlePopup: (event: React.MouseEvent) => void;
  handleCancel: () => void;
  handleDeleteHall: (id: number) => void;
  popupRef: React.RefObject<HTMLDivElement>;
  currentHall: { id: number | null; name: string };
};

export const HallRemovePopupView = ({
  handlePopup,
  handleCancel,
  handleDeleteHall,
  popupRef,
  currentHall,
}: TProps) => {
  return (
    <Popup
      title="Удалить"
      handlePopup={handlePopup}
      handleCancel={handleCancel}
      popupRef={popupRef}
    >
      <div className={classes["delete-popup"]}>
        <span className={classes["delete-question"]}>
          Вы уверены, что хотите удалить зал{" "}
          <span className="bold-text">"{currentHall.name}"</span>?
        </span>
        <div className={classes["btns-wrapper"]}>
          <button
            className={classes["save"] + " " + "button"}
            type="button"
            onClick={() => {
              handleDeleteHall(currentHall.id as number);
              handleCancel();
            }}
          >
            Удалить
          </button>
          <button
            className={classes["cancel"] + " " + "button-cncl"}
            type="button"
            onClick={handleCancel}
          >
            Отмена
          </button>
        </div>
      </div>
    </Popup>
  );
};
