import { useState, memo, useCallback } from "react";

import { DatePickerView } from "./DatePickerView";

import { TDays, TWeek } from "@/models/DatePickerModel";

export const DatePicker = memo(() => {
  const OneDay = 1000 * 60 * 60 * 24;
  const [backButton, setBackButton] = useState<boolean>(false);
  const getCurrentWeek = (): TDays => {
    const currentDate: Date = new Date();
    const shownDates: TDays = [];

    for (let i = 0; i < 7; i++) {
      shownDates.push({
        date: currentDate.getTime() + i * OneDay,
        week: (currentDate.getDay() + i) % 7,
        day: new Date(currentDate.getTime() + i * OneDay).getDate(),
      });
    }

    shownDates.pop();

    return shownDates;
  };

  const [shownDates, setShownDates] = useState<TDays>(() => getCurrentWeek());

  const handlePrevWeek = useCallback((): void => {
    setShownDates((next) => {
      const prev: TDays = [];

      if (next[0].day - 6 === new Date().getDate()) {
        prev.push(...getCurrentWeek());
        setBackButton(false);

        return prev;
      }

      const prevWeekFirstDay = new Date(next[0].date - 5 * OneDay);

      const incrementDays = (index: number) => {
        return new Date(prevWeekFirstDay.getTime() + index * OneDay).getDate();
      };

      next.forEach((_day, index) => {
        prev.push({
          date: prevWeekFirstDay.getTime() - index * OneDay,
          week: Math.abs(prevWeekFirstDay.getDay() + index) % 7,
          day: incrementDays(index),
        });
      });

      return prev;
    });
  }, []);

  const handleNextWeek = useCallback((): void => {
    setShownDates((prev) => {
      const nextWeekFirstDay =
        prev.length === 6
          ? new Date(prev[0].date + 6 * OneDay)
          : new Date(prev[0].date + 5 * OneDay);

      const next: TDays = [];

      const incrementDays = (index: number) => {
        return new Date(nextWeekFirstDay.getTime() + index * OneDay).getDate();
      };

      prev.forEach((_day, index) => {
        next.push({
          date: nextWeekFirstDay.getTime() + index * OneDay,
          week: (nextWeekFirstDay.getDay() + index) % 7,
          day: incrementDays(index),
        });
      });

      if (prev.length === 6) {
        setBackButton(true);
        next.pop();
      }
      return next;
    });
  }, []);

  const DayNames: TWeek = [
    {
      nameRu: "Вс",
      nameEn: "Sunday",
    },
    {
      nameRu: "Пн",
      nameEn: "Monday",
    },
    {
      nameRu: "Вт",
      nameEn: "Tuesday",
    },
    {
      nameRu: "Ср",
      nameEn: "Wednesday",
    },
    {
      nameRu: "Чт",
      nameEn: "Thursday",
    },
    {
      nameRu: "Пт",
      nameEn: "Friday",
    },
    {
      nameRu: "Сб",
      nameEn: "Saturday",
    },
  ];

  return (
    <DatePickerView
      backButton={backButton}
      shownDates={shownDates}
      handleNextWeek={handleNextWeek}
      handlePrevWeek={handlePrevWeek}
      DayNames={DayNames}
      OneDay={OneDay}
    />
  );
});
