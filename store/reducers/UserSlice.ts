import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IUser {
    id: number
    name: string
    email: string
} 

export interface IUserState {
    user: IUser
    isLoading: boolean
    error: string
    token: string
}

export const initialState: IUserState = {
    user: {id: 0, name: 'roman', email: 'email0'},
    isLoading: false,
    error: '',
    token: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getCurrentUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload
        }
    }
})

export default userSlice.reducer;