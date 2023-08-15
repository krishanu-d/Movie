import { configureStore } from '@reduxjs/toolkit'
import guestSlice from './Slice/GuestSlice';
import trendingMoviesSlice from './Slice/Trending';
import allMoviesSlice from './Slice/AllMovies';
import movieDetailsSlice from './Slice/DetailsSlice';
import reqTokenSlice from './Slice/ReqToken';
import tokenAuthSlice from './Slice/TokenAuth';
import sessionSlice from './Slice/LoginSlice';
import addFavSlice from './Slice/AddFav';
import addWatchSlice from './Slice/AddWatch';
import watchSlice from './Slice/GetWatch';
import favlistSlice from './Slice/GetFav';



export const store = configureStore({
    reducer: {
        guest: guestSlice,
        trending: trendingMoviesSlice,
        movies: allMoviesSlice,
        mDetails: movieDetailsSlice,
        token: reqTokenSlice,
        authrizedToken: tokenAuthSlice,
        usersession: sessionSlice,
        fav: addFavSlice,
        watchLists: addWatchSlice,
        listWatch: watchSlice,
        favList: favlistSlice,


    },
})