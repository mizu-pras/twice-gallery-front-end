import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/AppContext'
import axios from 'axios'

import { SET_MENUS } from '../../constant/actions'

import styles from './Home.module.css'

import Footer from '../Footer/Footer'

const Home = () => {
    const [{ menus }, dispatch] = useContext(Context)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchMenus = async () => {
            setLoading(true)

            const url = process.env.REACT_APP_API
            try {
                const { data } = await axios.get(`${url}/menus`)

                // setMenus(data)
                dispatch({ 
                    type: SET_MENUS,
                    payload: data
                })
            } catch (error) {
                console.log(error.message)
            }

            setLoading(false)
        }

        if (Object.keys(menus).length === 0) {
            console.log('fetch menu')
            fetchMenus()
        }

    }, [dispatch, menus])

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