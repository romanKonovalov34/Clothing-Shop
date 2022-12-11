import React, { useEffect, useState } from 'react'
import './Body.scss'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchAllProductsCreator } from '../store/reducers/ActionCreators';
import PopularProducts from './PopularProducts'
import CategoriesClothing from './CategoriesClothing'
import { Link } from 'react-router-dom'

const Body = () => {

    return (
        <div className='body'>
            <CategoriesClothing />
            <PopularProducts />
            <Link className='body__link-view-all' to='/products'>view all</Link>
        </div>
    )
}

export default Body