import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import ChangeLocation from './hook/changeLocation'

import Home from './components/Home/Home'
import Main from './components/Main/Main'
import Gallery from './components/Gallery/Gallery'
import NoPage from './components/NoPage/NoPage'

import './App.css'

const App = () => {
    return (
        <BrowserRouter>
            <ChangeLocation>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/gallery/:name' element={<Main />}>
                        <Route path=':title' element={<Gallery />} />
                    </Route>
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </ChangeLocation>
        </BrowserRouter>
    )
}

export default App