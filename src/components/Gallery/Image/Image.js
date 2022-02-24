import React, { useState, useRef } from 'react'
import styles from './Image.module.css'

const Image = ({ url, setActiveImage, heightDummyImage }) => {
    const [loaded, setLoaded] = useState(false)
    const imgEl = useRef(null)

    const handleClickImage = () => {
        const { offsetHeight: height, offsetWidth: width } = imgEl.current

        const orientation = width > height ? 'landscape' : 'portrait'

        setActiveImage({
            url,
            orientation
        })
    }

    return (
        <div>
            { !loaded && <div className={styles.loadingImage} style={{ height: `${heightDummyImage}px` }}></div> }
            <img
                ref={imgEl}
                onClick={handleClickImage}
                className={styles.img} 
                style={!loaded ? { display: 'none' } : {}}
                src={url} alt='' 
                onLoad={() => setLoaded(true)}
            />
        </div>
    )
}

export default Image