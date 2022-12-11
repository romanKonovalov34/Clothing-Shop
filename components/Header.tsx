import React from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'
import { FiShoppingCart, FiUser } from 'react-icons/fi'

const Header = () => {

    const pages = [
        { pageUrl: 'categories/mens-clothing', pageName: 'Men' },
        { pageUrl: 'categories/womens-clothing', pageName: 'Women' },
        { pageUrl: 'categories/jewelery', pageName: 'Jewerly' },
        { pageUrl: 'categories/electronics', pageName: 'Electronics' }
    ]

    return (
        <header className='header'>
            <div className="container">
                <div className="header__inner">
                    <h1 className="header__brand">
                        <Link className='header__link' to='/'>FakeStore</Link>
                    </h1>
                    <div className="header__menu">
                        <ul className="header__menu-list">
                            {pages.map(page =>
                                <li key={page.pageName} className="header__menu-item">
                                    <Link className='header__link' to={page.pageUrl}>{page.pageName}</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="header__actions">
                        {
                            localStorage.getItem('token') &&
                            <Link className='header__action' to='/cart'>
                                <FiShoppingCart className='header__icon header__cart-icon' size={27} />
                            </Link>
                        }
                        <Link className='header__action' to='/identity'>
                            <FiUser className='header__icon header__profile-icon' size={27} />
                        </Link>
                    </div>
                </div>
            </div>
        </header >
    )
}

export default Header