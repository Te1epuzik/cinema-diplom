import classes from "./addFilmPopup.module.scss";
import { Loader, Popup } from "@/components";
import { TForm } from "@/models/AddFilmModel";

type TProps = {
  handleAddFilm: (event: React.MouseEvent) => void;
  handleCancel: () => void;
  popupRef: React.RefObject<HTMLDivElement>;
  handleChangeForm: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  form: TForm;
  fileRef: React.RefObject<HTMLInputElement>;
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	fileTooBig: boolean;
	isLoading: boolean;
};

export const AddFilmPopupView = ({
  handleAddFilm,
  handleCancel,
  popupRef,
  handleChangeForm,
  form,
  fileRef,
  handleSubmit,
	fileTooBig,
	isLoading,
}: TProps) => {
  return (
    <Popup
      title="Добавление фильма"
      handlePopup={handleAddFilm}
      handleCancel={handleCancel}
      popupRef={popupRef}
    >
      <form className={classes["form"]} onSubmit={handleSubmit}>
        <label className={classes["label"]} htmlFor="film-name1">
          Название фильма
        </label>
        <input
          className={classes["input"] + " " + "input-text"}
          value={form.filmName}
          onChange={handleChangeForm}
          type="text"
          name="filmName"
          id="film-name1"
          placeholder="Например, «Гражданин Кейн»"
          required
					autoFocus
          autoComplete="off"
        />
        <label className={classes["label"]} htmlFor="film-duration1">
          Продолжительность фильма {"(мин.)"}
        </label>
        <input
          className={classes["input"] + " " + "input-text"}
          value={form.filmDuration}
          onChange={handleChangeForm}
          type="number"
          name="filmDuration"
          id="film-duration1"
          required
          autoComplete="off"
        />
        <label className={classes["label"]} htmlFor="description1">
          Описание фильма
        </label>
        <textarea
          className={classes["textarea"] + " " + "input-text"}
          value={form.filmDescription}
          onChange={handleChangeForm}
          name="filmDescription"
          id="description1"
          required
          autoComplete="off"
        ></textarea>
        <label
          className={classes["label"] + " " + classes["label-country"]}
          htmlFor="country1"
        >
          Страна
        </label>
        <input
          className={classes["input"] + " " + "input-text"}
          onChange={handleChangeForm}
          value={form.filmOrigin}
          type="text"
          name="filmOrigin"
          id="country1"
          required
          autoComplete="off"
        />
				{fileTooBig && <p className={classes["file-too-big"]}>Файл слишком большой, не более 3 МБ</p>}
        <div className={classes["btns-wrapper"]}>
          <button className={classes["submit"] + " " + "button"} type="submit">
						{isLoading ? <Loader /> : "Добавить фильм"}
          </button>
          <label
            className={classes["load-poster"] + " " + "button"}
            htmlFor="poster1"
          >
            Загрузить постер
						<span className={classes['only-png']}>only .png, max 3 MB</span>
          </label>
          <input
            className={classes["input-file"] + " " + "vh"}
            type="file"
            name="filePoster"
            id="poster1"
            accept=".png"
            ref={fileRef}
            required
          />
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
