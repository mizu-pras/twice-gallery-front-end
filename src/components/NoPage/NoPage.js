import React from 'react'

import styles from './NoPage.module.css'

const NoPage = () => {
    return (
        <div className={styles.noPage}>
            <p>404 {'=>'} Page Not Found</p>
        </div>
    )
}

export default NoPage