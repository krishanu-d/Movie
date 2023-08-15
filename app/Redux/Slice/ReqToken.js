import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    reqToken: [],
    status: 'idle',
    error: null,
}

const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/authentication/token/new?api_key=5c1d29d6f2d94205093873d1d2956fb5'
};



export const RequestToken = createAsyncThunk(
    'RequestToken',
    async () => {
        return await axios.request(options)
            .then((response) => {
                console.log('andar ka token data', response.data);
                return response.data;
            }
            )
            .catch((error) => {
                console.error(error);
            }
            );

    }
)

const reqTokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        reqToken: (state, action) => {
            state.reqToken = action.payload;
        }
    },
    extraReducers: {
        [RequestToken.pending]: (state, action) => {
            state.status = 'loading';
        },
        [RequestToken.fulfilled]: (state, action) => {
            state.status = 'success';
            state.reqToken = action.payload;
        },
        [RequestToken.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        }
    }
})

export default reqTokenSlice.reducer;