import React, { useEffect, useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'

import styles from './ToTheTop.module.css'

const ToTheTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {

        function toggleVisibility() {
            if (window.pageYOffset > 250) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        document.addEventListener("scroll", toggleVisibility)

        return () => document.removeEventListener("scroll", toggleVisibility)

    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <div className={styles.container}>

            { isVisible && 
                <button 
                    type='button' 
                    className={`${styles.buttonToTheTop} ${isVisible ? styles.animateFadeIn : ''}`}
                    onClick={scrollToTop}
                >
                    <IoIosArrowUp />
                </button>
            }

        </div>
    )
}

export default ToTheTop