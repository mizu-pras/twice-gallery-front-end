import React, { useState } from 'react'
import styles from './Image.module.css'

const Image = ({ url }) => {
    const [loaded, setLoaded] = useState(false)

    return (
        <div>
            { !loaded && <div className={styles.loadingImage}></div> }
            <img
                className={styles.img} 
                src={url} alt='' 
                onLoad={() => setLoaded(true)}
            />
        </div>
    )
}

export default Image