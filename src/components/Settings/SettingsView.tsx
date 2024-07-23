import classes from "./settings.module.scss";
import { Link } from "react-router-dom";
import GoingMoviLogo from "@/assets/Идёмвкино.svg";

import { Dropdown } from "@/components";

export const SettingsView = () => {
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
        {/* TODO перенести настройки в отлдельные компоненты, 
				сейчас это временно для настройки стилей */}
        <Dropdown content="Управление залами" position="first">
          <div className={classes["div"]}>
          </div>
        </Dropdown>
        <Dropdown content="Управление залами" position="midle">
          <div className={classes["div"]}>
          </div>
        </Dropdown>
        <Dropdown content="Управление залами" position="last">
          <div className={classes["div"]}>
          </div>
        </Dropdown>
      </main>
    </div>
  );
};
