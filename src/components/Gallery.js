import React from 'react'
import { useParams } from 'react-router-dom'

const Gallery = () => {
    const { title } = useParams()

    return (
        <div>
            
            Render Photo

        </div>
    )
}

export default Gallery