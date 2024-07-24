import classes from "./settings.module.scss";
import { useState, useEffect } from "react";
import { SettingsView } from "./SettingsView";
import { useGetAllData, useSetHall } from "@/services";
import { THall } from "@/models/SessionsModel";
import { Loader, E404 } from "@/components";

export const Settings = () => {
  const allData = useGetAllData();

  const setHall = useSetHall();
  const [availableHalls, setAvailableHalls] = useState<
    { name: string; id: number }[]
  >([]);

  useEffect(() => {
    if (setHall.data && setHall.data.result && setHall.data.result.halls) {
      setAvailableHalls(
        setHall.data.result.halls.map((hall: THall) => {
          return { name: hall.hall_name, id: hall.id };
        }),
      );
    }

    console.log(setHall.data);
  }, [setHall.data]);

  useEffect(() => {
    if (allData.data && allData.data.result && allData.data.result.halls) {
      setAvailableHalls(
        allData.data.result.halls.map((hall: THall) => {
          return { name: hall.hall_name, id: hall.id };
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
