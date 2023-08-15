import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    movieDetails: null,
    status: 'idle',
    error: null,
}

// const options = {
//     method: 'GET',
//     url: `https://api.themoviedb.org/3/movie/${id}?api_key=5c1d29d6f2d94205093873d1d2956fb5`,
//     params: {language: 'en-US'}
// };

export const details = createAsyncThunk(
    'details',
    async (id) => {
        console.log('id', id)
        return await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=5c1d29d6f2d94205093873d1d2956fb5`)
            .then((response) => {
                // console.log('andar ka detail movies data', response.data);
                return response.data;
            }
            )
            .catch((error) => {
                console.error(error);
            }
            );

    }
)

const movieDetialSlice = createSlice({
    name: 'mDetails',
    initialState,
    reducers: {
        movieDetails: (state, action) => {
            state.movieDetails = action.payload;
        }
    },
    extraReducers: {
        [details.pending]: (state, action) => {
            state.status = 'loading';
        },
        [details.fulfilled]: (state, action) => {
            state.status = 'success';
            state.movieDetails = action.payload;
        },
        [details.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        }
    }
})

export default movieDetialSlice.reducer;