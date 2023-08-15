import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    session_id: null,
    status: 'idle',
    error: null,
}




export const session = createAsyncThunk(
    'session',
    async (data) => {
        const options = {
            method: 'POST',
            url: 'https://api.themoviedb.org/3/authentication/session/new?api_key=5c1d29d6f2d94205093873d1d2956fb5',
            data: { request_token: data.request_token }
        };
        console.log('login ke andar bheja data------------>', data)
        return await axios.request(options).then((response) => {
            console.log('andar ka login data', response.data);
            return response.data;
        }
        )
            .catch((error) => {
                console.error(error);
            }
            );

    }
)


const sessionSlice = createSlice({
    name: 'usersession',
    initialState,
    reducers: {
        session_id: (state, action) => {
            state.session_id = action.payload;
        }
    },
    extraReducers: {
        [session.pending]: (state, action) => {
            state.status = 'loading';
        },
        [session.fulfilled]: (state, action) => {
            state.status = 'success';
            state.session_id = action.payload;
        },
        [session.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        }
    }
})

export default sessionSlice.reducer;