import classes from "./datePicker.module.scss";

import { NavLink } from "react-router-dom";

import { TDays, TWeek } from "@/models/DatePickerModel";
import { useFormatDate } from "@/hooks";

import { ArrowNextSVG, ArrowPrevSVG } from "@/svg";

type TProps = {
  shownDates: TDays;
  backButton: boolean;
  handleNextWeek: () => void;
  handlePrevWeek: () => void;
  DayNames: TWeek;
	OneDay: number;
};

export const DatePickerView = ({
  shownDates,
  backButton,
  handleNextWeek,
  handlePrevWeek,
  DayNames,
}: TProps) => {
  return (
    <>
      <div className={classes["date-picker"]}>
        {backButton && (
          <div className={classes["back-week"]} onClick={handlePrevWeek}>
            <ArrowPrevSVG />
          </div>
        )}
        {shownDates.map(({ week, day, date }) => (
          <NavLink
            key={date}
            id={`${day}`}
            to={useFormatDate(new Date(date))}
            className={({ isActive }) =>
              (new Date().getDate() === day
                ? classes["day"] + " " + classes["day--today"]
                : classes["day"]) +
              " " +
              (isActive && classes["active"])
            }
            style={week === 0 || week === 6 ? { color: "red" } : {}}
          >
            {new Date().getDate() === day
              ? "Сегодня\n" + DayNames[week].nameRu + ", " + day
              : DayNames[week].nameRu + ",\n" + day}
          </NavLink>
        ))}
        <div className={classes["next-week"]} onClick={handleNextWeek}>
          <ArrowNextSVG />
        </div>
      </div>
    </>
  );
};
