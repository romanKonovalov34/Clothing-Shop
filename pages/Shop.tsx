import React, { useEffect, useState } from 'react'
import './Shop.scss'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Body from '../components/Body';
import { useAppDispatch } from '../hooks/redux'
import { useLocation } from 'react-router-dom';
import { fetchAllProductsCreator } from '../store/reducers/ActionCreators';

const Shop = () => {

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchAllProductsCreator())
	}, [])

	const location = useLocation();

	return (
		<div>
			<div className='shop'>
				<div className='shop_header-body'>
					<Header />
					{location.pathname === '/' ? <Body /> : <Outlet />}
				</div>
				<Footer />
			</div>
		</div>
	)
}

export default Shop


