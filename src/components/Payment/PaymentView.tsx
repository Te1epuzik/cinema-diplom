import classes from './payment.module.scss'
import GoingMoviLogo from '@/assets/Идёмвкино.svg'
import { Link, Outlet } from 'react-router-dom'

export const PaymentView = () => {
	return (
		<div className={classes["payment"]}>
      <header className={classes["header"]}>
        <Link to="/">
          <img src={GoingMoviLogo} alt="Идем в кино" />
        </Link>
      </header>
			<main className={classes["main"]}>
				<Outlet />
			</main>
    </div>
	)
}
