import { TFData } from "@/models/SessionsModel";
import classes from "./seances.module.scss";
import { Link } from "react-router-dom";

import { E404 } from "@/components";

type TProps = {
  data: TFData;
  error: any;
  date: string;
};

export const SeancesView = ({ data, error, date }: TProps) => {
  return (
    <div className={classes["seances"]}>
      {error ? (
        <E404 />
      ) : (
        data.map((film) => (
          <div key={film.id} className={classes["film"]}>
            <div className={classes["about"]}>
              <img
                className={classes["poster"]}
                src={film.film_poster}
                alt={`${film.film_name} постер`}
              />
              <div className={classes["info"]}>
                <h2 className={classes["name"]}>{film.film_name}</h2>
                <p className={classes["description"]}>
                  {film.film_description}
                </p>
                <span
                  className={classes["duration-origin"]}
                >{`${film.film_duration} минут ${film.film_origin}`}</span>
              </div>
            </div>
            <div className={classes["halls"]}>
              {film.halls.find((hall) => {
                return hall.seances?.length !== 0;
              }) ? (
                film.halls.map(
                  (hall) =>
                    hall.seances?.length !== 0 && hall.hall_open === 1 && (
                      <div key={hall.id} className={classes["hall"]}>
                        <h3 className={classes["hall-name"]}>
                          {hall.hall_name}
                        </h3>
                        <div className={classes["seances-list"]}>
                          {hall.seances?.map((seance) => (
                            <Link
                              key={seance.id}
                              className={classes["seance"]}
                              to={`/client/reservation/${seance.id}&${date}&${seance.seance_time}`}
                            >
                              {seance.seance_time}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ),
                )
              ) : (
                <span className={classes['no-seances']}>На сегодня сеансов нет!</span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
