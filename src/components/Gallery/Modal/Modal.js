import React from 'react'
import useWindowDimensions from '../../../hook/dimension'

import { IoCloseOutline } from "react-icons/io5"

import styles from './Modal.module.css'

const Modal = ({ img, show, close }) => {
    const { width, height } = useWindowDimensions()

    const windowOrientation = width > height ? 'landscape' : 'portrait'
    const styleImg = windowOrientation === 'landscape' && img.orientation === 'portrait' 
        ? {
            height: '100%'
        } 
        : {
            width: '100%'
        }

    return (
        <div className={styles.modal} style={show ? { display: 'flex' } : {}} >

            <span className={styles.close} onClick={close}>
                <IoCloseOutline />
            </span>

            <div className={styles.modalContainer} style={{ maxWidth: height < width ? `${height}px` : `${width}px` }}>
                <img className={`${styles.modalContent} ${show ? styles.zoom : ''}`} src={img?.url} style={styleImg} alt='' />
            </div>

        </div>
    )
}

export default Modal