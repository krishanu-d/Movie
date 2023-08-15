import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    allMoviesList: [],
    status: 'idle',
    error: null,
}

const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/discover/movie?api_key=5c1d29d6f2d94205093873d1d2956fb5',
    params: {
        include_adult: 'false',
        include_video: 'false',
        language: 'en-US',
        page: '1',
        sort_by: 'vote_count.desc'
    }
};

export const allMovies = createAsyncThunk(
    'allMovies',
    async () => {
        return await axios.request(options)
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

const allMoviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        allMoviesList: (state, action) => {
            state.allMoviesList = action.payload;
        }
    },
    extraReducers: {
        [allMovies.pending]: (state, action) => {
            state.status = 'loading';
        },
        [allMovies.fulfilled]: (state, action) => {
            state.status = 'success';
            state.allMoviesList = action.payload;
        },
        [allMovies.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        }
    }
})

export default allMoviesSlice.reducer;