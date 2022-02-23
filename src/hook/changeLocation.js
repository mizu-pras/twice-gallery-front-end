import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ChangeLocation = ({ children }) => {
    const location = useLocation()

    useEffect(() => {

        if (location.pathname === '/') {
            window.scrollTo(0, 0)
        }

    }, [location]);

    return <>{ children }</>

}

export default ChangeLocation