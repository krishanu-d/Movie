import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    favRes: null,
    status: 'idle',
    error: null,
}



export const favPost = createAsyncThunk(
    'favPost',
    async (data) => {
        const options = {
            method: 'POST',
            url: `https://api.themoviedb.org/3/account/${data.account}/favorite`,
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzFkMjlkNmYyZDk0MjA1MDkzODczZDFkMjk1NmZiNSIsInN1YiI6IjY0ZDhmMGI5YjZjMjY0MTE1OTVhNTUwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zHiGyeToGn7LHDKA1NoHOvXupCwZ_feW0CM6WEQ0ppU'
            },
            data: {media_type: 'movie', media_id: data.id, favorite: data.state}
          };
        // console.log('login ke andar bheja data------------>', data)
        return await axios.request(options).then((response) => {
            console.log('andar ka add fav data', response.data);
            return response.data;
        }
        )
            .catch((error) => {
                console.error(error);
            }
            );

    }
)


const addFavSlice = createSlice({
    name: 'fav',
    initialState,
    reducers: {
        favRes: (state, action) => {
            state.favRes = action.payload;
        }
    },
    extraReducers: {
        [favPost.pending]: (state, action) => {
            state.status = 'loading';
        },
        [favPost.fulfilled]: (state, action) => {
            state.status = 'success';
            state.favRes = action.payload;
        },
        [favPost.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        }
    }
})

export default addFavSlice.reducer;