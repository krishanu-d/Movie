import Details from "../Screens/Details";
import Fav from "../Screens/Fav";
import Home from "../Screens/Home";
import Login from "../Screens/Login";
import Profile from "../Screens/Profile";
import Register from "../Screens/Register";
import New from "../Screens/New";
import Watchlist from "../Screens/Watchlist";

const { default: Splash } = require("../Screens/Splash");

const Routes = {
    Splash: {
        name: 'Splash',
        Screen: Splash,
        title: 'Splash',
    },
    Home: {
        name: 'Home',
        Screen: Home,
        title: 'Home',
    },
    Fav: {
        name: 'Fav',
        Screen: Fav,
        title: 'Fav',
    },
    Register: {
        name: 'Register',
        Screen: Register,
        title: 'Register',
    },
    Login: {
        name: 'Login',
        Screen: Login,
        title: 'Login',
    },
    Profile: {
        name: 'Profile',
        Screen: Profile,
        title: 'Profile',
    },
    Details: {
        name: 'Details',
        Screen: Details,
        title: 'Details',
    },
    New: {
        name: 'New',
        Screen: New,
        title: 'New',
    },
    Watchlist: {
        name: 'Watchlist',
        Screen: Watchlist,
        title: 'Watchlist',
    },

}

export default Routes;