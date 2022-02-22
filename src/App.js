import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from './components/Home/Home'
import Main from './components/Main/Main'
import Gallery from './components/Gallery'
import NoPage from './components/NoPage'

import './App.css'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/gallery/:name' element={<Main />}>
                    <Route path=':title' element={<Gallery />} />
                </Route>
                <Route path="*" element={<NoPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App