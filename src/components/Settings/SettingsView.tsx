import classes from "./settings.module.scss";
import { Link } from "react-router-dom";
import GoingMoviLogo from "@/assets/Идёмвкино.svg";

import {
  ConfigHalls,
  SettingHalls,
  ConfigPrice,
  SessionGrid,
  OpenSales,
} from "@/components";

type TProps = {
  allData: any;
  availableHalls: { id: number; name: string; hallOpen: 1 | 0 }[];
  handleDeleteHall: (id: number) => void;
  setHall: any;
};

export const SettingsView = ({
  allData,
  availableHalls,
  handleDeleteHall,
  setHall,
}: TProps) => {
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
        <SettingHalls
          availableHalls={availableHalls}
          setHall={setHall}
          handleDeleteHall={handleDeleteHall}
          allData={allData}
          position="first"
        />
        <ConfigHalls
          allData={allData}
          availableHalls={availableHalls}
          position="middle"
        />
        <ConfigPrice
          position="middle"
          availableHalls={availableHalls}
          allData={allData}
        />
        <SessionGrid
          position="middle"
          allData={allData}
          availableHalls={availableHalls}
        />
        <OpenSales
          position="last"
          allData={allData}
          availableHalls={availableHalls}
        />
      </main>
    </div>
  );
};
