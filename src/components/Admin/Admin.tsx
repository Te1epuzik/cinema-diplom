import classes from "./admin.module.scss";
import { Outlet } from "react-router-dom";

export const Admin = () => {
  return (
    <div className={classes["admin"]}>
      <Outlet />
    </div>
  );
};
