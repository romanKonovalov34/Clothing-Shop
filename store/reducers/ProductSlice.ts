import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IRating {
    rate: number
    count: number
}

export interface IProduct {
    id: number
    title: string
    price: number
    image: string
    description: string
    rating: IRating
    category: string
    isSelected: boolean
}

export interface IProductsStore {
    products: IProduct[]
    isLoading: boolean
    completed: boolean
    error: string
}

export const initialState: IProductsStore = {
    products: [],
    isLoading: true,
    completed: false,
    error: ''
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {


        fetchOneProduct(state) {
            state.isLoading = true
        },
        fetchOneProductSuccess(state, action: PayloadAction<IProduct>) {
            state.products[0] = action.payload
            state.isLoading = false
            state.error = ''
        },
        fetchOneProductError(state, action: PayloadAction<string>) {
            state.error = action.payload
            state.isLoading = false
        },


        fetchAllProducts(state) {
            state.isLoading = true
        },
        fetchAllProductsSuccess(state, action: PayloadAction<IProduct[]>) {
            state.products = action.payload
            state.isLoading = false
            state.error = ''
        },
        fetchAllProductsError(state, action: PayloadAction<string>) {
            state.error = action.payload
            state.isLoading = false
        },
        
    }
})

export default productSlice.reducer