import React, { useContext } from 'react'
import { Context } from '../context/AppContext'

const Header = () => {
	const [state] = useContext(Context)

	const renderUrl = {

	}

	return (
		<div className='container text-center'>
			<h1>{ state.name }</h1>
			<h1>{ state.title }</h1>
		</div>		
	)
}

export default Header