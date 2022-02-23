import React, { useEffect, useState, useContext } from 'react'
import { Outlet, useParams, useNavigate } from "react-router-dom"
import { Helmet } from 'react-helmet'
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

    const [state, dispatch] = useContext(Context);

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
                <Helmet>
                    <title>{ state.title }</title>
                    <meta property="og:site_name" content="Twitter" />
                    <meta property="og:image" content="https://pbs.twimg.com/media/Eo9LXfWW4AAtxeA.jpg" />
                    <meta property="og:title" content="lia pics di Twitter" />
                    <meta property="og:type" content="article" />
                    <meta property="og:description" content="“always radiating the biggest girlfriend material vibes https://t.co/aGwuRIUD0z“" />
                    <meta property="og:url" content="https://twice-gallery.netlify.app/gallery/tzuyu/yes-i-am-tzuyu" />
                </Helmet>
                
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