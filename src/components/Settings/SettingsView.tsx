import classes from './settings.module.scss';
import { Link } from 'react-router-dom';
import GoingMoviLogo from '@/assets/Идёмвкино.svg';

export const SettingsView = () => {
	return (
		<div className={classes['settings']}>
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
		</div>
	)
}
