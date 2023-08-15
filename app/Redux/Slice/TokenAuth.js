import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    tokenAuth: [],
    status: 'idle',
    error: null,
}

const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/authentication/token/new?api_key=5c1d29d6f2d94205093873d1d2956fb5'
};



export const tokenAuthentication = createAsyncThunk(
    'tokenAuthentication',
    async (data) => {
        return await axios.get(`https://www.themoviedb.org/authenticate/${data.request_token}`)
            .then((response) => {
                console.log('andar ka token authhhhh data', response.data);
                return response.data;
            }
            )
            .catch((error) => {
                console.error(error);
            }
            );

    }
)

const tokenAuthSlice = createSlice({
    name: 'authrizedToken',
    initialState,
    reducers: {
        tokenAuth: (state, action) => {
            state.tokenAuth = action.payload;
        }
    },
    extraReducers: {
        [tokenAuthentication.pending]: (state, action) => {
            state.status = 'loading';
        },
        [tokenAuthentication.fulfilled]: (state, action) => {
            state.status = 'success';
            state.tokenAuth = action.payload;
        },
        [tokenAuthentication.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        }
    }
})

export default tokenAuthSlice.reducer;