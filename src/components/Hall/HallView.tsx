import classes from './hall.module.scss';
import GoingMoviLogo from "@/assets/Идёмвкино.svg";

export const HallView = () => {
	return (
		<div className={classes['hall']}>
			<header className={classes['header']}>
				<img src={GoingMoviLogo} alt="Идем в кино" />
			</header>
		</div>
	)
}
