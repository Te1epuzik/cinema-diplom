import { Link } from 'react-router-dom'
import classes from './e404.module.scss'

export const E404 = () => {
	return (
		<div className={classes['e404']}>
			<span className={classes['code']}>404</span>
			<p className={classes['text']}>Упс, произошла оказия!</p>
			<Link to="/">На главную</Link>
		</div>
	)
}
