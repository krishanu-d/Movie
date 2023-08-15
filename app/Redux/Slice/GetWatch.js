import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    watch: [],
    status: 'idle',
    error: null,
}




export const watchList = createAsyncThunk(
    'watchList',
    async (data) => {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/account/${data}/watchlist/movies`,
            params: {language: 'en-US', page: '1', sort_by: 'created_at.asc'},
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzFkMjlkNmYyZDk0MjA1MDkzODczZDFkMjk1NmZiNSIsInN1YiI6IjY0ZDhmMGI5YjZjMjY0MTE1OTVhNTUwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zHiGyeToGn7LHDKA1NoHOvXupCwZ_feW0CM6WEQ0ppU'
            }
          };
          
        // console.log('login ke andar bheja data------------>', data)
        return await axios.request(options).then((response) => {
            // console.log('andar ka get watch data', response.data);
            return response.data.results;
        }
        )
            .catch((error) => {
                console.error(error);
            }
            );

    }
)


const watchSlice = createSlice({
    name: 'listWatch',
    initialState,
    reducers: {
        watch: (state, action) => {
            state.watch = action.payload;
        }
    },
    extraReducers: {
        [watchList.pending]: (state, action) => {
            state.status = 'loading';
        },
        [watchList.fulfilled]: (state, action) => {
            state.status = 'success';
            state.watch = action.payload;
        },
        [watchList.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        }
    }
})

export default watchSlice.reducer;