import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    favListdata: [],
    status: 'idle',
    error: null,
}

export const getfavList = createAsyncThunk(
    'getfavList',
    async (data) => {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/account/${data}/favorite/movies`,
            params: {language: 'en-US', page: '1', sort_by: 'created_at.asc'},
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzFkMjlkNmYyZDk0MjA1MDkzODczZDFkMjk1NmZiNSIsInN1YiI6IjY0ZDhmMGI5YjZjMjY0MTE1OTVhNTUwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zHiGyeToGn7LHDKA1NoHOvXupCwZ_feW0CM6WEQ0ppU'
            }
          };
        // console.log('login ke andar bheja data------------>', data)
        return await axios.request(options).then((response) => {
            // console.log('andar ka get fav data', res/favponse.data);
            return response.data.results;
        }
        )
            .catch((error) => {
                console.error(error);
            }
            );

    }
)


const favlistSlice = createSlice({
    name: 'favList',
    initialState,
    reducers: {
        favListdata: (state, action) => {
            state.favListdata = action.payload;
        }
    },
    extraReducers: {
        [getfavList.pending]: (state, action) => {
            state.status = 'loading';
        },
        [getfavList.fulfilled]: (state, action) => {
            state.status = 'success';
            state.favListdata = action.payload;
        },
        [getfavList.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        }
    }
})

export default favlistSlice.reducer;