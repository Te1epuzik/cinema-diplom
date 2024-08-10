import { TAvFilms } from "@/models/AddFilmModel";
import { TTimeLine } from "./SessionGrid";
import classes from "./sessionGrid.module.scss";
import {
  Dropdown,
  AddFilmPopup,
  Schedule,
  FilmRemovePopup,
  AddSeancePopup,
  DeleteSeancePopup,
  HintToDnd,
} from "@/components";
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
  availableHalls: { name: string; id: number }[];
  allData: any;
  handleDeleteFilmPopup: (
    event: React.MouseEvent | React.TouchEvent<HTMLButtonElement>,
    filmId?: number,
    filmName?: string,
  ) => void;
  filmToDelete: { id: number | null; name: string };
  deleteFilm: boolean;
  filmsRef: React.RefObject<HTMLDivElement>;
  seanceInfo: { hallId: number | null; filmId: number | null };
  handleAddFilmPopup: (event: React.MouseEvent) => void;
  addSeance: boolean;
  seancesGrid: TTimeLine[];
  setSeancesGrid: React.Dispatch<React.SetStateAction<TTimeLine[]>>;
  setDeleteSeance: React.Dispatch<
    React.SetStateAction<{
      trigger: boolean;
      id: number | null;
      film: string;
      hallId: number | null;
    }>
  >;
  deleteSeance: {
    trigger: boolean;
    id: number | null;
    film: string;
    hallId: number | null;
  };
  handleDeleteSeancePopup: (event: React.MouseEvent) => void;
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
  availableHalls,
  allData,
  handleDeleteFilmPopup,
  filmToDelete,
  deleteFilm,
  filmsRef,
  seanceInfo,
  handleAddFilmPopup,
  addSeance,
  seancesGrid,
  setSeancesGrid,
  deleteSeance,
  setDeleteSeance,
  handleDeleteSeancePopup,
}: TProps) => {
  return (
    <Dropdown content={"Сетка сеансов"} position={position}>
      {deleteSeance.trigger && (
        <DeleteSeancePopup
          handlePopup={handleDeleteSeancePopup}
          handleCancel={handleCancel}
          popupRef={popupRef}
          seanceId={deleteSeance.id}
          filmName={deleteSeance.film}
          availableFilms={availableFilms}
          setSeancesGrid={setSeancesGrid}
          hallId={deleteSeance.hallId}
        />
      )}
      {addSeance && (
        <AddSeancePopup
          setSeancesGrid={setSeancesGrid}
          seanceInfo={seanceInfo}
          handleCancel={handleCancel}
          handlePopup={handleAddFilmPopup}
          popupRef={popupRef}
          availableHalls={availableHalls}
          availableFilms={availableFilms}
        />
      )}
      {deleteFilm && (
        <FilmRemovePopup
          handlePopup={handleDeleteFilmPopup}
          handleCancel={handleCancel}
          handleDeleteFilm={handleDeleteFilm}
          popupRef={popupRef}
          filmToDelete={filmToDelete}
        />
      )}
      {addFilm && (
        <AddFilmPopup
          handleAddFilm={handleAddFilm}
          handleCancel={handleCancel}
          popupRef={popupRef}
          setAvailableFilms={setAvailableFilms}
        />
      )}
      <div className={classes["session-grid"]} id="session-grid1">
        <div className={classes["films"]}>
          <button
            className={classes["add-film"] + " " + "button"}
            onClick={handleAddFilm}
            type="button"
          >
            Добавить фильм
          </button>
          <HintToDnd />
          <div className={classes["film-list"]} ref={filmsRef}>
            {availableFilms.map((film) => (
              <div
                key={film.filmName}
                id={film.filmId.toString()}
                className={classes["film"] + " " + "film"}
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
                  onClick={(event) =>
                    handleDeleteFilmPopup(event, film.filmId, film.filmName)
                  }
                  onTouchStart={(event: React.TouchEvent<HTMLButtonElement>) =>
                    handleDeleteFilmPopup(event, film.filmId, film.filmName)
                  }
                >
                  <img className={classes["bin"]} src={binPNG} alt="Удалить" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <Schedule
          availableHalls={availableHalls}
          allData={allData}
          seancesGrid={seancesGrid}
          setSeancesGrid={setSeancesGrid}
          setDeleteSeance={setDeleteSeance}
        />
      </div>
    </Dropdown>
  );
};
