import React, { createContext, useReducer } from 'react'
import { UPDATE_NAME, UPDATE_TITLE , SET_DATA, APPEND_DATA, SET_MENUS } from '../constant/actions'

export const Context = createContext()

const initalState = {
    name: '',
    title: '',
    data: [],
    menus: {}
}

const reducer = (state, action) => {
    switch(action.type) {
        case UPDATE_NAME:
            return {...state, name: action.payload}
        case UPDATE_TITLE:
            return {...state, title: action.payload}
        case SET_DATA:
            return {...state, data: action.payload}
        case APPEND_DATA:
            return {...state, data: [...state.data, ...action.payload]}
        case SET_MENUS:
            return {...state, menus: action.payload}
        default:
            return state
    }
}

const AppContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initalState)

    return (
        <Context.Provider value={[state, dispatch]}>
            { children }
        </Context.Provider>
    )
}

export default AppContext