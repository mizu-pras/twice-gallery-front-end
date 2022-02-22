import React, { useEffect, useState, useContext } from 'react'
import { Outlet, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { UPDATE_NAME, UPDATE_TITLE, SET_DATA, APPEND_DATA } from '../../constant/actions'

import Loading from './Loading/Loading'
import ToTheTop from './ToTheTop/ToTheTop'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

import { Context } from '../../context/AppContext'

import styles from './Main.module.css'

const Main = () => {
    const navigate = useNavigate()

    const { title, name } = useParams()
    const [loading, setLoading] = useState(true)
    const [loadmore, setLoadmore] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState(0)

    const [, dispatch] = useContext(Context);

    const loadMoreHandle = () => {
        setCurrentPage(prevPage => prevPage + 1)
    }

    useEffect(() => {
        const firsttime = currentPage === 1 ? true : false
        const fetchApi = async () => {
            if (!firsttime) {
                setLoadmore(true)
            }

            const url = process.env.REACT_APP_API

            try {
            
                const { data: response } = await axios.get(`${url}/gallery/${name}/${title}?page=${currentPage}`);
                const { data, totalPage } = response
                
                const type = firsttime ? SET_DATA : APPEND_DATA

                dispatch({ type, payload: data })

                if (firsttime) {
                    dispatch({ type: UPDATE_NAME, payload: name.toUpperCase() })
                    dispatch({ type: UPDATE_TITLE, payload: response.title })

                    setLastPage(totalPage)
                    setLoading(false)
                }

            } catch (error) {
                if (firsttime) {
                    navigate('/not-found', { replace: true })
                    return
                }
            }

            if (!firsttime) {
                setLoadmore(false)
            }
        }

        fetchApi()

    }, [navigate, currentPage, dispatch, name, title])

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

                    <ToTheTop />
                </div>
                
                <Footer />
            </div>
    )
}

export default Main