import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IAuthState {
    token: string
    isPending: boolean
    error: string
}

const initialState = {
    token: '',
    isPending: false,
    error: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signInPending(state, action: PayloadAction) {
            state.error = ''
            state.isPending = true
        },
        signIn(state, action: PayloadAction<string>) {
            state.error = ''
            state.token = action.payload
            localStorage.setItem('token', action.payload)
            state.isPending = false
        },
        signInError(state, action: PayloadAction<string>) {
            state.error = action.payload
        }
    }
})

export default authSlice.reducer