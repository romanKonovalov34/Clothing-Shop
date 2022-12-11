import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import './CurrentProduct.scss'
import { AiFillHeart } from 'react-icons/ai'
import { AiFillStar } from 'react-icons/ai'
import { MdPeopleAlt } from 'react-icons/md'

const CurrentProduct = () => {

	const products = useAppSelector(state => state.productReducer.products)

	const location = useLocation()
	const currentProductId = Number(location.pathname.split('/').slice(-1))
	const currentProduct = products.filter(product => product.id === currentProductId)[0]

	let similarProducts = products.filter(product => product.category === currentProduct.category && product.id !== currentProduct.id)
	similarProducts = mixSimilarProducts()

	function getRandomInt(min: number, max: number) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min);
	}

	//перемешивание каждый раз что бы не показывать одни и теже 4 товара
	function mixSimilarProducts() {
		let randomValue = 0
		const arrRandomValue = new Array()

		//первое значение (т.к. оно всегда уникальное)
		randomValue = getRandomInt(0, similarProducts.length - 1)
		arrRandomValue.push(randomValue)

		let quantityProducts = 0
		if (similarProducts.length >= 4) {
			quantityProducts = 4
		}
		else if (similarProducts.length > 0 && similarProducts.length < 4) {
			quantityProducts = similarProducts.length
		}

		// остальные значения
		while (arrRandomValue.length < quantityProducts) {
			randomValue = getRandomInt(0, similarProducts.length)
			for (let i = 0; i < arrRandomValue.length; i++) {
				if (randomValue === arrRandomValue[i]) {
					break
				}
				if (i === arrRandomValue.length - 1) {
					arrRandomValue.push(randomValue)
				}
			}
		}
		const mixedArray = Array()
		for (let i = 0; i < arrRandomValue.length; i++) {
			mixedArray.push(similarProducts[arrRandomValue[i]])
		}
		return mixedArray
	}

	return (
		<div>
			<div className='current-product'>
				<div className="current-product__img-container">
					<img className='current-product__img' src={currentProduct.image} alt={currentProduct.title} />
				</div>
				<div className="current-product__info">
					<h1 className="current-product__title">{currentProduct.title}</h1>
					<b className="current-product__price">${currentProduct.price}</b>
					<div className="current-product__rating">
						<b className="current-product__rate">
							{currentProduct.rating.rate}
							<AiFillStar className='current-product__star-icon' />
						</b>
						<b className="current-product__rate-count">
							{currentProduct.rating.count}
							<MdPeopleAlt className='current-product__peoples-icon' />
						</b>
					</div>
					<div className="current-product__btns">
						<button className="product__btn-add current-product__btn-add">add to cart</button>
						<button className="product__btn-save current-product__btn-save">
							<AiFillHeart size={23} />
						</button>
					</div>
					<div className="current-product__description">
						<h3 className="current-product__description-title">Description</h3>
						<p className="current-product__description-text">{currentProduct.description}</p>
					</div>
				</div>
			</div>

			<div className="container">
				<h3 className="similar-products__section-name">you might also like</h3>
				<div className="similar-products">
					{similarProducts.map((product, index) => {
						if (index <= 3) {
							return (
								<Link
									className="similar-products__card"
									to={'/products/' + product.id}
									key={index}
								>
									<img className='similar-products__image' src={product.image} alt="" />
									<div className="similar-products__info">
										<div className="similar-products__title">{product.title}</div>
										<div className="similar-products__price">${product.price}</div>
										<button className="product__btn-save similar-products__btn-save">
											<AiFillHeart size={20} />
										</button>
									</div>
								</Link>
							)
						}
					})}
				</div>
			</div>

		</div>

	)
}

export default CurrentProduct