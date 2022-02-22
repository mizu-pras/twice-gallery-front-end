import React, { useEffect, useState, useContext } from 'react'
import { Outlet, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { UPDATE_NAME, UPDATE_TITLE } from '../../constant/actions'

import Header from '../Header/Header'
import { Context } from '../../context/AppContext'

import styles from './Main.module.css'

const Main = () => {
    const navigate = useNavigate();
    const { title, name } = useParams();
    const [loading, setLoading] = useState(true);
    const [loadmore, setLoadmore] = useState(false);
    const [data, setData] = useState([]);
    const [_, dispatch] = useContext(Context);

    const fetchData = async (firsttime = false) =>{  
        try {
            const { data: response } = await axios.get(`http://localhost:8080/gallery/${name}/${title}`);
            
            setData(response.data)
            
            setName(name.toUpperCase())
            setTitle(response.title)

            if (firsttime) {
                setLoading(false)
            }

        } catch (error) {
            navigate('/not-found', { replace: true });
        }
    }

    const setName = (data) => {
        dispatch({ type: UPDATE_NAME, payload: data })
    }

    const setTitle = (data) => {
        dispatch({ type: UPDATE_TITLE, payload: data })
    }

    useEffect(() => {
        fetchData(true)
    }, [])

    return (
        loading ? <div>Loading..</div> :
            <div className={styles.main}>
                <Header />

                <Outlet />
            </div>
    )
}

export default Main