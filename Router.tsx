import { createBrowserRouter } from 'react-router-dom'
import Shop from './pages/Shop'
import ErrorPage from './Error-page'
import Products from './pages/Products'
import CurrentProduct from './pages/CurrentProduct'
import Categories from './pages/Categories'
import CategoryPage from './pages/CategoryPage'
import Cart from './components/Cart'
import Identity from './pages/Identity'

let isSignin = false

const routesForNotSignin = [
    {
        path: '/',
        element: <Shop />,
        errorElement: <ErrorPage />,
        children: [

            //products
            {
                path: 'products',
                element: <Products />,
                children: [
                    {
                        path: ':productId',
                        element: <CurrentProduct />
                    }
                ]
            },

            //categories
            {
                path: 'categories',
                element: <Categories />,
                children: [
                    {
                        path: 'mens-clothing',
                        element: <CategoryPage />,
                        children: [
                            {
                                path: ':productId',
                                element: <CurrentProduct />
                            }
                        ]
                    },
                    {
                        path: 'womens-clothing',
                        element: <CategoryPage />,
                        children: [
                            {
                                path: ':productId',
                                element: <CurrentProduct />
                            }
                        ]
                    },
                    {
                        path: 'jewelery',
                        element: <CategoryPage />,
                        children: [
                            {
                                path: ':productId',
                                element: <CurrentProduct />
                            }
                        ]
                    },
                    {
                        path: 'electronics',
                        element: <CategoryPage />,
                        children: [
                            {
                                path: ':productId',
                                element: <CurrentProduct />
                            }
                        ]
                    },
                ]
            },
            
            //my-account
            {
                path: '/identity',
                element: <Identity />,
            }
        ],
    },
]

const routesForSignin = [
    {
        path: '/cart',
        element: <Cart />,
    }
]

export const router = createBrowserRouter(isSignin ? [...routesForSignin, ...routesForNotSignin] : routesForNotSignin)