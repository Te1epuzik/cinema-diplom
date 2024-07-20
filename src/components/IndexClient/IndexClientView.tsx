import { Outlet, Link } from "react-router-dom";
import classes from "./indexClient.module.scss";

import GoingMoviLogo from "@/assets/Идёмвкино.svg";

import { DatePicker } from "@/components";

export const IndexClientView = () => {
  return (
    <div className={classes["index-client"]}>
      <header className={classes["header"]}>
        <div className={classes["header-top"]}>
          <Link to={"/"}>
            <img
              className={classes["logo"]}
              src={GoingMoviLogo}
              alt="Идем в кино"
            />
          </Link>
          <Link className={classes["login"]} to={"/admin"}>
            Войти
          </Link>
        </div>

        <DatePicker />
      </header>

      <Outlet />
    </div>
  );
};
