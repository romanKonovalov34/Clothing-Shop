import React from 'react'
import { Link } from 'react-router-dom'
import './CategoriesClothing.scss'

const CategoriesClothing = () => {
    return (
        <div className="container">
            <section className="categories">
                <figure className='categories__category'>
                    <img className='categories__category-img' src='https://asset2.cxnmarksandspencer.com/is/image/mands/20220929_MW_DLP_SB-30661_HR_M1?wid=950&qlt=70&fmt=pjpeg' alt="" />
                    <figcaption className='categories__category-name'>Men</figcaption>
                    <Link className='categories__category-link' to='/'>View</Link>
                </figure>
                <figure className="categories__category">
                    <img className='categories__category-img' src='https://ae04.alicdn.com/kf/H309e84311a0a464e98807a9d4ab1895cP/-.jpg_640x640.jpg' alt="" />
                    <figcaption className='categories__category-name'>Women</figcaption>
                    <Link className='categories__category-link' to='/'>View</Link>
                </figure>
            </section>
        </div>
    )
}

export default CategoriesClothing