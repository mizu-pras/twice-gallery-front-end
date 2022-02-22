import React, { useContext, useState } from 'react'
import { Context } from '../../context/AppContext'
import useWindowDimensions from '../../hook/dimension'

import Image from './Image/Image'
import Modal from './Modal/Modal'

import styles from './Gallery.module.css'

const Gallery = () => {
    const { width } = useWindowDimensions()
    const [{ data }] = useContext(Context)

    const [activeImage, setActiveImage] = useState({})

    const renderedImage = () => {
        if (!data) {
            return null
        }

        // single
        if (width <= 600) {
            return (
                <div className={styles.galleryContainer}>
                
                    <div className={styles.galleryWrapper}>
                        {
                            data.map((img, idx) => (
                                <Image key={`data-${idx}`} url={img} setActiveImage={setActiveImage} />
                            ))
                        }
                    </div>

                </div>
            )
        }

        const column1 = data.filter((_, i) => i % 3 === 0)
        const column2 = data.filter((_, i) => i % 3 === 1)
        const column3 = data.filter((_, i) => i % 3 === 2)

        return (
            <div className={styles.galleryContainer}>
            
                <div className={styles.galleryWrapper}>
                    {
                        column1.map((img, idx) => (
                            <Image key={`col-1-${idx}`} url={img} setActiveImage={setActiveImage} />
                        ))
                    }
                </div>

                <div className={styles.galleryWrapper}>
                    {
                        column2.map((img, idx) => (
                            <Image key={`col-2-${idx}`} url={img} setActiveImage={setActiveImage} />
                        ))
                    }
                </div>

                <div className={styles.galleryWrapper}>
                    {
                        column3.map((img, idx) => (
                            <Image key={`col-3-${idx}`} url={img} setActiveImage={setActiveImage} />
                        ))
                    }
                </div>

            </div>
        )

    }

    return (
        <div className={styles.gallery}>
            
            { renderedImage() }

            <Modal 
                img={activeImage} 
                show={"url" in activeImage ? true : false} 
                close={() => setActiveImage({})}
            />

        </div>
    )
}

export default Gallery