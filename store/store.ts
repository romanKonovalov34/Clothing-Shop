import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice";
import productReducer from './reducers/ProductSlice'
import authReducer from './reducers/AuthSlice'

const rootReducer = combineReducers({
    userReducer,
    productReducer,
    authReducer
})

export const setupStore = () => configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
