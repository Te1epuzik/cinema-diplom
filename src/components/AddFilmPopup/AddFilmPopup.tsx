import { TAvFilms, TForm } from "@/models/AddFilmModel";
import { AddFilmPopupView } from "./AddFilmPopupView";
import { useEffect, useRef, useState } from "react";
import { useAddFilm } from "@/services";
import { TFilm } from "@/models/SessionsModel";

type TProps = {
  handleAddFilm: (event: React.MouseEvent) => void;
  handleCancel: () => void;
  popupRef: React.RefObject<HTMLDivElement>;
  setAvailableFilms: React.Dispatch<React.SetStateAction<TAvFilms[]>>;
};

export const AddFilmPopup = ({
  handleAddFilm,
  handleCancel,
  popupRef,
  setAvailableFilms,
}: TProps) => {
	const [fileTooBig, setFileTooBig] = useState<boolean>(false);
  const [form, setForm] = useState<TForm>({
    filmName: "",
    filmDuration: "",
    filmDescription: "",
    filmOrigin: "",
    filePoster: null,
  });
  const fileRef = useRef<HTMLInputElement>(null);
  const { data, error, isLoading, fetchData } = useAddFilm();

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !fileRef ||
      !fileRef.current ||
      !fileRef.current.files ||
      !fileRef.current.files[0]
    ) {
      return;
    }
    const params = new FormData();
    params.set("filmName", form.filmName);
    params.set("filmDuration", form.filmDuration);
    params.set("filmDescription", form.filmDescription);
    params.set("filmOrigin", form.filmOrigin);
    params.set("filePoster", fileRef.current.files[0]);
    fetchData(params);
  };

  useEffect(() => {
    if (!data || !data.success) {
      return;
    }

    setAvailableFilms(
      data.result.films.map((film: TFilm) => {
        return {
          filmId: film.id,
          filmName: film.film_name,
          filmDuration: film.film_duration,
          filmPoster: film.film_poster,
        };
      }),
    );

    handleCancel();
  }, [data, error]);

  const handleChangeForm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    if (
      !fileRef.current ||
      !fileRef.current.files ||
      !fileRef.current.files[0]
    ) {
      return;
    }

    if (fileRef.current.files[0].size > 3000000) {
			setFileTooBig(true);
      return;
    }

		setFileTooBig(false);

    const handleFileChange = () => {
      if (
        !fileRef.current ||
        !fileRef.current.files ||
        !fileRef.current.files[0]
      ) {
        return;
      }

      if (fileRef.current && fileRef.current.files) {
        const fileList = fileRef.current.files;

        setForm((prev) => {
          return { ...prev, filePoster: fileList[0] };
        });
      }
    };

    fileRef.current.addEventListener("change", handleFileChange);
    return () => {
      if (
        !fileRef.current ||
        !fileRef.current.files ||
        !fileRef.current.files[0]
      ) {
        return;
      }

      fileRef.current.removeEventListener("change", handleFileChange);
    };
  }, [fileRef.current, data]);

  return (
    <AddFilmPopupView
      handleAddFilm={handleAddFilm}
      handleCancel={handleCancel}
      handleChangeForm={handleChangeForm}
      form={form}
      popupRef={popupRef}
      fileRef={fileRef}
      handleSubmit={handleSubmit}
			fileTooBig={fileTooBig}
			isLoading={isLoading}
    />
  );
};
