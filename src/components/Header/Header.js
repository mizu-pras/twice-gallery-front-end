import React, { useContext } from 'react'
import { Context } from '../../context/AppContext'
import { Link } from 'react-router-dom'

import { IoHomeOutline } from "react-icons/io5"

import styles from './Header.module.css'

const Header = () => {
	const [state] = useContext(Context)

	const renderUrl = {

	}

	return (
		<div className='opacity'>
			<header className={styles.navHeader}>
				<Link to='/' className={styles.navLogo}>
					<IoHomeOutline />
				</Link>
			</header>
			<div className={`container text-center ${styles.headerInfo}`}>
				<h1 className={styles.headerName}>{ state.name }</h1>
				<p className={styles.headerTitle}>{ state.title }</p>
			</div>	
		</div>	
	)
}

export default Header