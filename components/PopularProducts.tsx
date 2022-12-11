import React from 'react'
import { useAppSelector } from '../hooks/redux'
import Carousel from './Carousel'
import MyLoader from './MyLoader'
import './PopularProducts.scss'

const PopularProducts = () => {

    const isLoading = useAppSelector(state => state.productReducer.isLoading)

    return (
        <section className="popular-products">
            <h2 className='popular-products__section-name'>Popular products</h2>
            {
                isLoading

                    ?

                    <MyLoader />

                    :
                    <div>
                        <Carousel />
                    </div>
            }
        </section>
    )
}

export default PopularProducts
