import React from 'react'

import styles from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={`container ${styles.footer}`}>
            <p>Copyright &copy; 2022</p>
            <p>Data by <a href="https://kpopping.com/" target="_blank">kpopping.com</a></p>
            <p>@mizu</p>
        </footer>
    )
}

export default Footer