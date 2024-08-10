import { TAvFilms } from "@/models/AddFilmModel";
import classes from "./addSeancePopup.module.scss";
import { Popup, DropdownList, Loader } from "@/components";
import { ClockSVG } from "@/svg";

type TProps = {
  handlePopup: (event: React.MouseEvent) => void;
  handleCancel: () => void;
  popupRef: React.RefObject<HTMLDivElement>;
  handleSelectHall: (id: number | null, name: string) => void;
  handleSelectFilm: (id: number | null, name: string) => void;
  selectedHall: { id: number | null; name: string };
  selectedFilm: { id: number | null; name: string };
  availableHalls: { id: number | null; name: string }[];
  availableFilms: TAvFilms[];
  timeRef: React.RefObject<HTMLInputElement>;
  time: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  data: any;
};

export const AddSeancePopupView = ({
  handlePopup,
  handleCancel,
  popupRef,
  handleSelectHall,
  handleSelectFilm,
  selectedHall,
  selectedFilm,
  availableHalls,
  availableFilms,
  timeRef,
  time,
  handleChange,
  handleSubmit,
  isLoading,
  data,
}: TProps) => {
  return (
    <Popup
      title="Добавление сеанса"
      handlePopup={handlePopup}
      handleCancel={handleCancel}
      popupRef={popupRef}
    >
      <form className={classes["form"]} onSubmit={handleSubmit}>
        <div className={classes["input-wrapper"]}>
          <label className={classes["label"]} htmlFor="hallDropdown1">
            Название зала
          </label>
          <DropdownList id="hallDropdown1" selectedItem={selectedHall.name}>
            <ul className={classes["dropdown-list"]}>
              {availableHalls.map((hall) => {
                if (selectedHall.id !== hall.id) {
                  return (
                    <li
                      key={hall.id}
                      className={classes["item"]}
                      onClick={() => handleSelectHall(hall.id, hall.name)}
                    >
                      {hall.name}
                    </li>
                  );
                }
              })}
            </ul>
          </DropdownList>
        </div>
        <div className={classes["input-wrapper"]}>
          <label className={classes["label"]} htmlFor="filmDropdown1">
            Название фильма
          </label>
          <DropdownList id="filmDropdown1" selectedItem={selectedFilm.name}>
            <ul className={classes["dropdown-list"]}>
              {availableFilms.map((film) => {
                if (selectedFilm.id !== film.filmId) {
                  return (
                    <li
                      key={film.filmId}
                      className={classes["item"]}
                      onClick={() =>
                        handleSelectFilm(film.filmId, film.filmName)
                      }
                    >
                      {film.filmName}
                    </li>
                  );
                }
              })}
            </ul>
          </DropdownList>
        </div>
        <div className={classes["input-wrapper"]}>
          <label className={classes["label"]} htmlFor="timeStart1">
            Время начала
          </label>
          <input
            onChange={handleChange}
            ref={timeRef}
            value={time}
            type="time"
            name="time"
            id="timeStart1"
            className={classes["time"] + " " + "input-text"}
          />
          <ClockSVG />
        </div>
        {data && !data.success && (
          <span className={classes["error"]}>{data.error}</span>
        )}
        <div className={classes["btns-wrapper"]}>
          <button className={classes["submit"] + " " + "button"} type="submit">
            {isLoading ? <Loader /> : "Добавить сеанс"}
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
