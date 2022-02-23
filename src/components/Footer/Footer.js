import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoPencilOutline, IoHomeOutline } from 'react-icons/io5'

import styles from './Footer.module.css'

const Footer = () => {
    const location = useLocation()

    return (
        <footer className={`container ${styles.footer}`}>
            
            <p>Data by <a href="https://kpopping.com/" target="_blank" rel="noreferrer">kpopping.com</a></p>
            
            <div className={styles.footerLink}>
                {
                    location.pathname !== '/' && (
                        <Link to='/'>
                            <div className={styles.contentLink}>
                                <IoHomeOutline />
                                <span>Home</span>
                            </div>
                        </Link>
                    )
                }
                <a href="https://www.instagram.com/elaktmfksl/" target="_blank" rel="noreferrer">
                    <div className={styles.contentLink}>
                        <IoPencilOutline />
                        <span>Mizu</span>
                    </div>
                </a>
            </div>
        </footer>
    )
}

export default Footer