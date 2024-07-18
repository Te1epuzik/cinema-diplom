export type TFData = TFilm[];

export type TFilm = {
  id: number;
  film_description: string;
  film_name: string;
  film_duration: number;
  film_origin: string;
  film_poster: string;
	halls: THall[];
};

export type TSeance = {
  id: number;
  seance_hallid: number;
  seance_filmid: number;
  seance_time: string;
};

export type THall = {
  hall_config: any;
  hall_name: string;
  hall_open: number;
  hall_places: number;
  hall_price_standart: number;
  hall_price_vip: number;
  hall_rows: number;
  id: number;
	seances?: TSeance[];
};
