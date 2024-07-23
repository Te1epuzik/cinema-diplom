import classes from "./settings.module.scss";
import { Link } from "react-router-dom";
import GoingMoviLogo from "@/assets/Идёмвкино.svg";

import { SettingHalls } from "@/components";

type TProps = {
	allData: any;
};

export const SettingsView = ({ allData }: TProps) => {
  return (
    <div className={classes["settings"]}>
      <header className={classes["header"]}>
        <Link to="/" className={classes["logo"]}>
          <img
            className={classes["logo-svg"]}
            src={GoingMoviLogo}
            alt="Идем в кино"
          />
          <span className={classes["logo-admin"]}>Администраторская</span>
        </Link>
      </header>
      <main className={classes["main"]}>
        <SettingHalls allData={allData} position="first" />
      </main>
    </div>
  );
};
