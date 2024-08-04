import { FilmRemovePopupView } from "./FilmRemovePopupView";

type TProps = {
  handlePopup: (event: React.MouseEvent) => void;
  handleCancel: () => void;
  handleDeleteFilm: (id: number) => void;
  popupRef: React.RefObject<HTMLDivElement>;
  filmToDelete: {
    id: number | null;
    name: string;
  };
};

export const FilmRemovePopup = ({
  handlePopup,
  handleCancel,
  handleDeleteFilm,
  popupRef,
  filmToDelete,
}: TProps) => {
  return (
    <FilmRemovePopupView
      filmToDelete={filmToDelete}
      handleDeleteFilm={handleDeleteFilm}
      handlePopup={handlePopup}
      handleCancel={handleCancel}
      popupRef={popupRef}
    />
  );
};
