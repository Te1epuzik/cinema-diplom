import { Outlet } from "react-router-dom";
import classes from "./client.module.scss";

export const Client = () => {
	return (
		<div className={classes["client"]}>
			<Outlet />
    </div>
	)
}
