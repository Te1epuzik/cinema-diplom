import classes from "./settings.module.scss";
import { SettingsView } from "./SettingsView";
import { useGetAllData } from "@/services";
import { Loader, E404 } from "@/components";

export const Settings = () => {
	const allData = useGetAllData();
	
  return (
    <>
      {allData.isLoading && (
        <div className={classes["loader"]}>
          <Loader />
        </div>
      )}
			{allData.error && <E404 />}
      {allData.data && <SettingsView allData={allData} />}
    </>
  );
};
