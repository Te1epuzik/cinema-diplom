import classes from "./filmRemovePopup.module.scss";
import { Popup } from "@/components";

type TProps = {
  handlePopup: (event: React.MouseEvent) => void;
  handleCancel: () => void;
  handleDeleteFilm: (id: number) => void;
  filmToDelete: {
    id: number | null;
    name: string;
  };
  popupRef: React.RefObject<HTMLDivElement>;
};

export const FilmRemovePopupView = ({
  handlePopup,
  handleCancel,
  popupRef,
  handleDeleteFilm,
  filmToDelete,
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
          Вы уверены, что хотите удалить фильм <span className="bold-text">"{filmToDelete.name}"</span>?
        </span>
        <div className={classes["btns-wrapper"]}>
          <button
            className={classes["save"] + " " + "button"}
            type="button"
            onClick={() => {
              handleDeleteFilm(filmToDelete.id as number);
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
