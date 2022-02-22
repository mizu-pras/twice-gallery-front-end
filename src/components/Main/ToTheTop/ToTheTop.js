import React, { useEffect, useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'

import styles from './ToTheTop.module.css'

const ToTheTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {

        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        document.addEventListener("scroll", function(e) {
            toggleVisibility();
        });

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
                    className={styles.buttonToTheTop}
                    onClick={scrollToTop}
                >
                    <IoIosArrowUp />
                </button>
            }

        </div>
    )
}

export default ToTheTop