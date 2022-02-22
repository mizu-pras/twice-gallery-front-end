import React, { useContext } from 'react'
import { Context } from '../../context/AppContext'
import { Link } from 'react-router-dom'

import styles from './Header.module.css'

const Header = () => {
	const [state] = useContext(Context)

	const renderUrl = {

	}

	return (
		<div className='opacity'>
			<header className={styles.navHeader}>
				<Link to='/' className={styles.navLogo}>
					<i className="fa fa-home"></i>
				</Link>
			</header>
			<div className={`container text-center ${styles.headerInfo}`}>
				<h1 className={styles.headerName}>{ state.name }</h1>
				<h2 className={styles.headerTitle}>{ state.title }</h2>
			</div>	
		</div>	
	)
}

export default Header