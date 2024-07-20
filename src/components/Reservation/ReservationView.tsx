import classes from "./reservation.module.scss";
import GoingMoviLogo from "@/assets/Идёмвкино.svg";
import { Link, Outlet } from "react-router-dom";

export const ReservationView = () => {
  return (
    <div className={classes["reservation"]}>
      <header className={classes["header"]}>
        <Link to="/">
          <img src={GoingMoviLogo} alt="Идем в кино" />
        </Link>
      </header>
			<main className={classes["main"]}>
				<Outlet />
			</main>
    </div>
  );
};
