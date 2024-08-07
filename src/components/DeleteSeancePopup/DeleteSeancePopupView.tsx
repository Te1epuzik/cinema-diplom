import classes from "./deleteSeancePopup.module.scss";
import { Loader, Popup } from "@/components";

type TProps = {
  handlePopup: (event: React.MouseEvent) => void;
  handleCancel: () => void;
  popupRef: React.RefObject<HTMLDivElement>;
  filmName: string;
  handleDeleteSeance: () => void;
	isLoading: boolean;
};

export const DeleteSeancePopupView = ({
  handlePopup,
  handleCancel,
  popupRef,
  filmName,
  handleDeleteSeance,
	isLoading,
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
          Вы уверены, что хотите снять с сеанса фильм{" "}
          <span className="bold-text">"{filmName}"</span>?
        </span>
        <div className={classes["btns-wrapper"]}>
          <button
            className={classes["submit"] + " " + "button"}
            type="button"
            onClick={handleDeleteSeance}
          >
						{isLoading ? <Loader /> : "Удалить"}
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
