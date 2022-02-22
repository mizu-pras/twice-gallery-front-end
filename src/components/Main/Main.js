import React, { useEffect, useState, useContext } from 'react'
import { Outlet, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { UPDATE_NAME, UPDATE_TITLE, SET_DATA, APPEND_DATA } from '../../constant/actions'

import Loading from './Loading'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

import { Context } from '../../context/AppContext'

import styles from './Main.module.css'

const Main = () => {
    const navigate = useNavigate()

    const { title, name } = useParams()
    const [loading, setLoading] = useState(true)
    const [loadmore, setLoadmore] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [lastPage, setLastPage] = useState(0)

    const [_, dispatch] = useContext(Context);

    const fetchData = async (firsttime = false) => {  
        if (!firsttime) {
            setLoadmore(true)
        }

        const url = process.env.REACT_APP_API

        try {
            const { data: response } = await axios.get(`${url}/gallery/${name}/${title}?page=${currentPage + 1}`);
            const { data, page, totalPage } = response            

            const type = firsttime ? SET_DATA : APPEND_DATA

            dispatch({ type, payload: data })

            setLastPage(totalPage)
            setCurrentPage(page)

            if (firsttime) {
                setName(name.toUpperCase())
                setTitle(response.title)

                setLoading(false)
            }

        } catch (error) {
            if (firsttime) {
                navigate('/not-found', { replace: true });   
                return 
            }
        }

        if (!firsttime) {
            setLoadmore(false)
        }
    }

    const setName = (data) => {
        dispatch({ type: UPDATE_NAME, payload: data })
    }

    const setTitle = (data) => {
        dispatch({ type: UPDATE_TITLE, payload: data })
    }

    const loadMoreHandle = () => {
        fetchData()
    }

    useEffect(() => {
        fetchData(true)
    }, [])

    return (
        loading ? <Loading /> :
            <div>
                <div className={styles.main}>
                    <Header />
                    <Outlet />

                    <div className={styles.loadMoreWrapper}>
                        {
                            currentPage < lastPage ? (
                                loadmore ? <span>Loading</span>
                                    : <button className={styles.loadMoreBtn} type="button" onClick={loadMoreHandle}>
                                        <span>Load more</span>
                                    </button>
                            ) : null
                                
                        }
                    </div>
                </div>
                
                <Footer />
            </div>
    )
}

export default Main