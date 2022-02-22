import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'

import Footer from '../Footer/Footer'

const linkRoadmap = {
	'tzuyu': [
		'yes-i-am-tzuyu'
	],
	'mina': [
		'yes-i-am-mina'
	],
    'jihyo': [
		'yes-i-am-jihyo'
	],
	'sana': [
		'yes-i-am-sana'
	]
}

const Home = () => {
    const renderedMenu = () => {

        return (
            <div className={styles.linkContainer}>

            {
                Object.keys(linkRoadmap).map(key => {
                    return (
                        <div key={key} className={styles.linkWrap}>
                            <div className={styles.linkTitle}>{ key }</div>
                            
                            <div className={styles.linkItems}>
                                {
                                    linkRoadmap[key].map(link => (
                                        <Link key={link} to={`/gallery/${key}/${link}`}>{ link }</Link>
                                    ))
                                }
                            </div>
                        </div>
                    )
                })
            }

            </div>
        )

    }

    return (
        <>
            <div className={`container ${styles.homeContainer}`}>

                <div className={`text-center ${styles.homeTitleContainer}`}>
                    <h1 className={styles.homeTitle}>TWICE Photobook (Scans) </h1>
                </div>

                { renderedMenu() }

            </div>

            <Footer />
        </>
    )
}

export default Home