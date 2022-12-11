import React from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import './Products.scss'

const Products = () => {

	const location = useLocation()
	const products = useAppSelector(state => state.productReducer.products)

	return (
		<>

			{location.pathname === '/products'

				?

				<div className='container'>
					<div className="products">
						<div className="products__inner">
							<div className="products__cards">
								{products.map(product =>
									<Link
										className="products__card"
										to={'/products/' + product.id}
										key={product.title}
									>
										<img className='products__image' src={product.image} alt="" />
										<div className="products__info">
											<div className="products__title">{product.title}</div>
											<div className="products__price">${product.price}</div>
											<button className="product__btn-save products__btn-save">
												<AiFillHeart size={20} />
											</button>
										</div>
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>

				:

				<Outlet />}

		</>
	)
}

export default Products
