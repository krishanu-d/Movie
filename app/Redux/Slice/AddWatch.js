import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    watchlist: null,
    status: 'idle',
    error: null,
}



export const watchlistPost = createAsyncThunk(
    'watchlistPost',
    async (data) => {
        const options = {
            method: 'POST',
            url: `https://api.themoviedb.org/3/account/${data.account}/watchlist`,
            headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzFkMjlkNmYyZDk0MjA1MDkzODczZDFkMjk1NmZiNSIsInN1YiI6IjY0ZDhmMGI5YjZjMjY0MTE1OTVhNTUwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zHiGyeToGn7LHDKA1NoHOvXupCwZ_feW0CM6WEQ0ppU'
                  },
            data: { media_type: 'movie', media_id: data.id, watchlist: data.state }
        };
        console.log('login ke andar bheja data------------>', data)
        return await axios.request(options).then((response) => {
            console.log('andar ka add watch data', response.data);
            return response.data;
        }
        )
            .catch((error) => {
                console.error(error);
            }
            );

    }
)


const addWatchSlice = createSlice({
    name: 'watchLists',
    initialState,
    reducers: {
        watchlist: (state, action) => {
            state.watchlist = action.payload;
        }
    },
    extraReducers: {
        [watchlistPost.pending]: (state, action) => {
            state.status = 'loading';
        },
        [watchlistPost.fulfilled]: (state, action) => {
            state.status = 'success';
            state.watchlist = action.payload;
        },
        [watchlistPost.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        }
    }
})

export default addWatchSlice.reducer;