import classes from "./settings.module.scss";
import { useState, useEffect } from "react";
import { SettingsView } from "./SettingsView";
import { useSetHall } from "@/services";
import { THall } from "@/models/SessionsModel";
import { Loader, E404 } from "@/components";

type TProps = {
  allData: any;
};

export const Settings = ({ allData }: TProps) => {
  const setHall = useSetHall();
  const [availableHalls, setAvailableHalls] = useState<
    { name: string; id: number, hallOpen: 1 | 0 }[]
  >([]);

  useEffect(() => {
    if (setHall.data && setHall.data.result && setHall.data.result.halls) {
      setAvailableHalls(
        setHall.data.result.halls.map((hall: THall) => {
          return { name: hall.hall_name, id: hall.id, hallOpen: hall.hall_open };
        }),
      );
    }

  }, [setHall.data]);

  useEffect(() => {
    if (allData.data && allData.data.result && allData.data.result.halls) {
      setAvailableHalls(
        allData.data.result.halls.map((hall: THall) => {
          return { name: hall.hall_name, id: hall.id, hallOpen: hall.hall_open };
        }),
      );
    }
  }, [allData.data]);

  const handleDeleteHall = (id: number) => {
    setHall.fetchData({
      method: "delete",
      hallId: id,
    });
  };

  return (
    <>
      {allData.isLoading && (
        <div className={classes["loader"]}>
          <Loader />
        </div>
      )}
      {allData.error && <E404 />}
      {allData.data && (
        <SettingsView
          allData={allData}
          availableHalls={availableHalls}
          handleDeleteHall={handleDeleteHall}
          setHall={setHall}
        />
      )}
    </>
  );
};
