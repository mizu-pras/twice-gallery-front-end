import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet} from 'react-helmet'
import axios from 'axios'

import styles from './Home.module.css'

import Footer from '../Footer/Footer'

const Home = () => {
    const [loading, setLoading] = useState(true)
    const [menus, setMenus] = useState({})

    useEffect(() => {
        const fetchMenus = async () => {
            const url = process.env.REACT_APP_API
            try {
                const { data } = await axios.get(`${url}/menus`)

                setMenus(data)
            } catch (error) {
                console.log(error.message)
            }

            setLoading(false)
        }

        fetchMenus()
    }, [])

    const renderedMenu = () => {

        return (
            <div className={styles.linkContainer}>

            {  
                loading ? <div className='text-center'>
                    <p>Loading...</p>
                </div> 
                : Object.keys(menus).map(key => {
                    return (
                        <div key={key} className={styles.linkWrap}>
                            <div className={styles.linkTitle}>{ key }</div>
                            
                            <div className={styles.linkItems}>
                                {
                                    menus[key].map(link => (
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
            <Helmet>
                <title>TWICE Photo Collection</title>
            </Helmet>

            <div className={`container ${styles.homeContainer}`}>

                <div className={`text-center ${styles.homeTitleContainer}`}>
                    <h1 className={styles.homeTitle}>TWICE Photo Collection</h1>
                </div>

                { renderedMenu() }

            </div>

            <Footer />
        </>
    )
}

export default Home