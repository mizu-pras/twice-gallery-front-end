import React from 'react'
import useWindowDimensions from '../../../hook/dimension'

import styles from './Modal.module.css'

const Modal = ({ img, show, close }) => {
    const { width, height } = useWindowDimensions()

    const styleImg = width <= 600 || img.orientation == 'landscape' ? {
        width: '100%'
    } : {
        height: '100%'
    }

    return (
        <div className={styles.modal} style={show ? { display: 'flex' } : {}} >

            <span className={styles.close} onClick={close}>&times;</span>

            <div className={styles.modalContainer} style={{ maxWidth: height < width ? `${height}px` : `${width}px` }}>
                <img className={`${styles.modalContent} ${show ? styles.zoom : ''}`} src={img?.url} style={styleImg} />
            </div>

        </div>
    )
}

export default Modal