import classes from "./hallPopup.module.scss";
import { Popup, Loader } from "@/components";

type TProps = {
  handleHallPopup: (event: React.MouseEvent<HTMLElement>) => void;
  handleCancel: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
	isLoading: boolean;
};

export const HallPopupView = ({
  handleHallPopup,
  handleCancel,
  handleSubmit,
  handleChange,
  value,
	isLoading,
}: TProps) => {
  return (
    <Popup
      handlePopup={handleHallPopup}
      handleCancel={handleCancel}
      title="Добавление зала"
    >
      <form className={classes["form"]} onSubmit={handleSubmit}>
        <div className={classes["input-wrapper"]}>
          <label className={classes["hall-label"]} htmlFor="hallname1">
            Название зала
          </label>
          <input
            className={classes["hall-input"] + " " + "input-text"}
            onChange={handleChange}
            value={value}
            type="text"
            name="hall-name"
            id="hallname1"
            placeholder="Например, «Зал 1»"
            required
          />
        </div>
        <div className={classes["btns-wrapper"]}>
          <button
            className={classes["submit"] + " " + "button"}
            type="submit"
          >
            {isLoading ? <Loader /> : "Добавить зал"}
          </button>
          <button
            onClick={handleCancel}
            className={classes["cancel"] + " " + "button-cncl"}
            type="button"
          >
            Отменить
          </button>
        </div>
      </form>
    </Popup>
  );
};
