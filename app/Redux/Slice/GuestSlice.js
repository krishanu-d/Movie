import{createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    guestSessionId: '',
    status: 'idle',
    error: null,
}

export const guestSession = createAsyncThunk(
    'guestSession',
    async () => {
        return await axios.get('https://api.themoviedb.org/3/authentication/guest_session/new?api_key=5c1d29d6f2d94205093873d1d2956fb5')
        .then((response) => {
            console.log('andar ka guest session data',response.data);
            return response.data.guest_session_id;
        }
        )
        .catch((error) => {
            console.error(error);
        }
        );

    }
)

const guestSlice = createSlice({
    name: 'guest',
    initialState,
    reducers: {
        guestSessionId: (state, action) => {
            state.guestSessionId = action.payload;
        }
    },
    extraReducers: {
        [guestSession.pending]: (state, action) => {
            state.status = 'loading';
        },
        [guestSession.fulfilled]: (state, action) => {
            state.status = 'success';
            state.guestSessionId = action.payload;
        },
        [guestSession.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        }
    }
})

export default guestSlice.reducer;