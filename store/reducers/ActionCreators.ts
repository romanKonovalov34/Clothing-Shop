import axios from "axios";
import { redirect } from "react-router-dom";
import { ActionCreator } from "redux";
import { AppDispatch } from "../store";
import { authSlice } from "./AuthSlice";
import { IProduct, productSlice } from "./ProductSlice";
import { userSlice } from "./UserSlice";

//products
//fetch one product
export const fetchOneProduct = (id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(productSlice.actions.fetchOneProduct)
        const response = await axios.get(`https://fakestoreapi.com/products${id}`)
        dispatch(productSlice.actions.fetchOneProductSuccess(response.data))
    }
    catch {
        dispatch(productSlice.actions.fetchOneProductError('Error of fetching product!'))
    }
}

//fetch all products
export const fetchAllProductsCreator = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(productSlice.actions.fetchAllProducts())
        const response = await axios.get<IProduct[]>('https://fakestoreapi.com/products')
        dispatch(productSlice.actions.fetchAllProductsSuccess(response.data))
        console.log(response.data)
    }
    catch {
        dispatch(productSlice.actions.fetchAllProductsError("Error of fetching products!"))
    }
}

//autorisation

function parseJwt(token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

function returnToMaintPage() {
    redirect('/')
}

export const signInCreator = (username: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.signInPending())
    const responce = await axios.post('https://fakestoreapi.com/auth/login', {
        username: "mor_2314",
        password: "83r5^_"
        // username,
        // password
    })
        .then(response => {
            dispatch(authSlice.actions.signIn(response.data.token))
            localStorage.setItem('token', response.data.token)
            const userInfo = parseJwt(response.data.token)
            returnToMaintPage()
        })
        .catch(error => dispatch(authSlice.actions.signInError(error)))
}


