import React, { useEffect, useRef, useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { IProduct, productSlice } from '../store/reducers/ProductSlice'
import './Carousel.scss'
import PaginationDots from './PaginationDots'
import { Link, useLocation } from 'react-router-dom'

const Carousel = () => {

    const [activePaginationDotId, setActivePaginationDotId] = useState<number>(0)

    const countProducts = 12
    const countVisibleCards = 4
    const countDots = countProducts / countVisibleCards
    const allProducts = useAppSelector(state => state.productReducer.products)
    const popularProducts = getPopularProducts()

    function getPopularProducts() {
        let previousMax = 1000000
        let currentMax = 0
        let targetProduct = new Object()
        const resultProductsArr = new Array()

        for (let i = 0; i < countProducts; i++) {
            for (let j = 0; j < allProducts.length; j++) {
                if (allProducts[j].rating.count > currentMax && allProducts[j].rating.count < previousMax) {
                    currentMax = allProducts[j].rating.count
                    Object.assign(targetProduct, allProducts[j])
                }
            }
            resultProductsArr.push({...targetProduct})
            previousMax = currentMax
            currentMax = 0
        }
        return resultProductsArr
    }

    function clickPaginationButton(direction: string) {
        getPopularProducts()
        if (direction === 'back') {
            if (activePaginationDotId === 0) {
                setActivePaginationDotId(countDots - 1)
            }
            else {
                setActivePaginationDotId(prev => prev - 1)
            }
        }
        else {
            if (activePaginationDotId === countDots - 1) {
                setActivePaginationDotId(0)
            }
            else {
                setActivePaginationDotId(prev => prev + 1)
            }
        }
    }

    function clickPaginationDot(id: number) {
        setActivePaginationDotId(id)
    }

    function spinCarousel() {
        const carousel = document.querySelector<HTMLElement>('.carousel__cards')
        if (carousel) {
            carousel.style.translate = String(-(1200 * activePaginationDotId)) + 'px'
        }
    }

    useEffect(() => {
        spinCarousel()
    }, [activePaginationDotId])

    return (
        <section className='carousel'>
            <div className="carousel__inner">
                <div className="carousel__window">
                    <div className="carousel__cards">

                        {popularProducts.map(product =>
                            <Link
                                className="carousel__card"
                                key={product.id}
                                to={'products/' + String(product.id)}
                            >
                                <img className="carousel__image" src={product.image} alt={product.title} />
                                <div className="carousel__card-info">
                                    <h4 className="carousel__title">{product.title}</h4>
                                    <b className="carousel__price">${product.price}</b>
                                </div>
                            </Link>
                        )}

                    </div>
                </div>
                <div className="carousel__pagination">
                    <div className="carousel__pagination-inner">
                        <div className="carousel__arrow-back carousel__arrow" onClick={() => clickPaginationButton('back')}>
                            <MdKeyboardArrowLeft />
                        </div>
                        <PaginationDots
                            products={popularProducts}
                            activePaginationDotId={activePaginationDotId}
                            countDots={countDots}
                            clickPaginationDot={clickPaginationDot}
                        />
                        <div className="carousel__arrow-next carousel__arrow" onClick={() => clickPaginationButton('next')}>
                            <MdKeyboardArrowRight />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Carousel
