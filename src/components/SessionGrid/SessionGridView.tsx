import { TAvFilms } from "@/models/AddFilmModel";
import classes from "./sessionGrid.module.scss";
import { Dropdown, AddFilmPopup, Schedule } from "@/components";
import binPNG from "@/assets/bin.png";

type TProps = {
  position: "first" | "middle" | "last";
  handleAddFilm: (event: React.MouseEvent) => void;
  popupRef: React.RefObject<HTMLDivElement>;
  handleCancel: () => void;
  addFilm: boolean;
  availableFilms: TAvFilms[];
  handleDeleteFilm: (filmId: number) => void;
  setAvailableFilms: React.Dispatch<React.SetStateAction<TAvFilms[]>>;
  handleDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    filmId: number,
  ) => void;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  availableHalls: { name: string; id: number }[];
  allData: any;
};

export const SessionGridView = ({
  position,
  handleAddFilm,
  popupRef,
  handleCancel,
  addFilm,
  availableFilms,
  handleDeleteFilm,
  setAvailableFilms,
  handleDragStart,
  handleDragOver,
  handleDrop,
  availableHalls,
  allData,
}: TProps) => {
  return (
    <Dropdown content={"Сетка сеансов"} position={position}>
      {addFilm && (
        <AddFilmPopup
          handleAddFilm={handleAddFilm}
          handleCancel={handleCancel}
          popupRef={popupRef}
          setAvailableFilms={setAvailableFilms}
        />
      )}
      <div className={classes["session-grid"]}>
        <div className={classes["films"]}>
          <button
            className={classes["add-film"] + " " + "button"}
            onClick={handleAddFilm}
            type="button"
          >
            Добавить фильм
          </button>
          <div className={classes["film-list"]}>
            {availableFilms.map((film) => (
              <div
                key={film.filmName}
                className={classes["film"]}
                onDragStart={(event) => handleDragStart(event, film.filmId)}
                draggable
              >
                <img
                  className={classes["film-poster"]}
                  src={film.filmPoster}
                  alt={film.filmName}
                />
                <div className={classes["film-info"]}>
                  <span className={classes["film-name"]}>{film.filmName}</span>
                  <span className={classes["film-duration"]}>
                    {film.filmDuration} минут
                  </span>
                </div>
                <button
                  className={classes["delete"]}
                  type="button"
                  onClick={() => handleDeleteFilm(film.filmId)}
                >
                  <img className={classes["bin"]} src={binPNG} alt="Удалить" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <Schedule
          availableHalls={availableHalls}
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          allData={allData}
        />
      </div>
    </Dropdown>
  );
};
