import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    trendingMoviesList: [],
    status: 'idle',
    error: null,
}

export const trendingMovies = createAsyncThunk(
    'trendingMovies',
    async () => {
        return await axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=5c1d29d6f2d94205093873d1d2956fb5')
            .then((response) => {
                // console.log('andar ka trending movies data', response.data);
                return response.data.results;
            }
            )
            .catch((error) => {
                console.error(error);
            }
            );

    }
)

const trendingMoviesSlice = createSlice({
    name: 'trending',
    initialState,
    reducers: {
        trendingMoviesList: (state, action) => {
            state.trendingMoviesList = action.payload;
        }
    },
    extraReducers: {
        [trendingMovies.pending]: (state, action) => {
            state.status = 'loading';
        },
        [trendingMovies.fulfilled]: (state, action) => {
            state.status = 'success';
            state.trendingMoviesList = action.payload;
        },
        [trendingMovies.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        }
    }
})

export default trendingMoviesSlice.reducer;