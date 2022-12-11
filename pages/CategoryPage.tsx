import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import './CategoryPage.scss'
import { AiFillStar } from 'react-icons/ai'
import { MdPeopleAlt } from 'react-icons/md'
import { AiFillHeart } from 'react-icons/ai'

const CategoryPage = () => {

	const categoriesNames = {
		"/categories/mens-clothing": "men's clothing",
		"/categories/womens-clothing": "women's clothing",
		"/categories/jewelery": "jewelery",
		"/categories/electronics": "electronics",
	}

	const location = useLocation()
	const productsCurrentCategory = useAppSelector(state => state.productReducer.products)
		.filter(product => product.category === categoriesNames[location.pathname as keyof typeof categoriesNames])

	console.log(location.pathname as keyof typeof categoriesNames)

	return (
		<div className="container">
			<div className='category-page'>
				<div className="category-page__inner">
					<div className="category-page__products">
						{productsCurrentCategory.map(product =>
							<Link
								className="category-page__product"
								to={`/products/${product.id}`}
								key={product.title}
							>
								<div className="category-page__image-container">
									<img className='category-page__image' src={product.image} alt="" />
								</div>
								<div className="category-page__info">
									<h1 className="current-product__title">{product.title}</h1>
									<b className="current-product__price">${product.price}</b>
									<div className="current-product__rating">
										<b className="current-product__rate">
											{product.rating.rate}
											<AiFillStar className='current-product__star-icon' />
										</b>
										<b className="current-product__rate-count">
											{product.rating.count}
											<MdPeopleAlt className='current-product__peoples-icon' />
										</b>
									</div>
									<div className="current-product__btns">
										<button className="product__btn-add current-product__btn-add">add to cart</button>
										<button className="product__btn-save current-product__btn-save">
											<AiFillHeart size={23} />
										</button>
									</div>
								</div>
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default CategoryPage