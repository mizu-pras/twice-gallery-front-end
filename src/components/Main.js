import React, { useEffect, useState, useContext } from 'react'
import { Outlet, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { UPDATE_NAME, UPDATE_TITLE } from '../constant/actions'

import Header from './Header'
import { Context } from '../context/AppContext'

const Main = () => {
    const navigate = useNavigate();
    const { title, name } = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [_, dispatch] = useContext(Context);

    const fetchData = async () =>{  
        try {
            const { data: response } = await axios.get(`http://localhost:8080/gallery/${name}/${title}`);
            
            setData(response.data)
            
            setName(name.toUpperCase())
            setTitle(response.title)

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
        fetchData()
    }, [])

    return (
        <div>
            <Header />

            <Outlet />
        </div>
    )
}

export default Main