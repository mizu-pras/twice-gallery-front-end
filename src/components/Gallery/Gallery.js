import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../../context/AppContext'
import useWindowDimensions from '../../hook/dimension'

import Image from './Image/Image'
import Modal from './Modal/Modal'

import styles from './Gallery.module.css'

const Gallery = () => {
    const { width } = useWindowDimensions()
    const [{ data }] = useContext(Context)

    const [activeImage, setActiveImage] = useState({})
    const [heightDummyImage, setHeightDummyImage] = useState(0)

    useEffect(() => {

        const heightByWidth = width <= 600 ? width / 2 : width > 1500 ? 1500 / 3 : width / 3

        setHeightDummyImage(heightByWidth)   

    }, [width])

    const renderedImage = () => {
        if (!data) {
            return null
        }

        const columns = []

        // single
        if (width <= 600) {
            columns.push(data.filter((_, i) => i % 2 === 0))
            columns.push(data.filter((_, i) => i % 2 === 1))

            // return (
            //     <div className={styles.galleryContainer}>
                
            //         <div className={styles.galleryWrapper}>
            //             {
            //                 data.map((img, idx) => (
            //                     <Image key={`data-${idx}`} url={img} setActiveImage={setActiveImage} />
            //                 ))
            //             }
            //         </div>

            //     </div>
            // )
        }
        else {
            columns.push(data.filter((_, i) => i % 3 === 0))
            columns.push(data.filter((_, i) => i % 3 === 1))
            columns.push(data.filter((_, i) => i % 3 === 2))
        }

        // const column1 = data.filter((_, i) => i % 3 === 0)
        // const column2 = data.filter((_, i) => i % 3 === 1)
        // const column3 = data.filter((_, i) => i % 3 === 2)

        return (
            <div className={styles.galleryContainer}>

                {
                    columns.map((column, idxCol) => {
                        return (
                            <div key={`container-col-${idxCol}`} className={styles.galleryWrapper}>
                                {
                                    column.map((img, idxRow) => (
                                        <Image 
                                            key={`col-${idxCol}-${idxRow}`} 
                                            url={img} 
                                            setActiveImage={setActiveImage} 
                                            heightDummyImage={heightDummyImage}
                                        />
                                    ))
                                }
                            </div>
                        )
                    })
                }

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