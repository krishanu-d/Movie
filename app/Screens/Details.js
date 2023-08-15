import { View, Text, StatusBar, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { details } from '../Redux/Slice/DetailsSlice';
import { Colors } from '../Colors';
import FastImage from 'react-native-fast-image';
import { Images } from '../Images/images';
import { Utils } from '../Components/Utils';
import { Values } from '../Components/Values';
import { favPost } from '../Redux/Slice/AddFav';
import { watchlistPost } from '../Redux/Slice/AddWatch';

export default function Details(props) {

    const { id } = props.route.params;
    const [data, setData] = useState('')
    console.log('data', id)
    const dispatch = useDispatch();
    const movieDetailsData = useSelector(state => {
        return state.mDetails
    })

    const fav = useSelector(state => {
        return state.fav
    })

    const watchlist = useSelector(state => {
        return state.watchLists
    })

    const sessionId = async () => {
        const session = await Utils.getData(Values.SESSION);
        setData(session)
        console.log('details ka session============>', session);
    }


    useEffect(() => {
        // console.log('id', id)
        dispatch(details(id))
        sessionId()
    }, [])

    useEffect(() => {
        console.log('movieDetailsData------>', fav.favRes?.success)
        if (fav.favRes?.success) {
            ToastAndroid.show('Added to Fav', ToastAndroid.SHORT);
        }
    }, [fav])

    useEffect(() => {
        console.log('movieDetailsData------>', watchlist.watchlist?.success)
        if (watchlist.watchlist?.success) {
            ToastAndroid.show('Added to WatchList', ToastAndroid.SHORT);
        }
    }, [watchlist])

    const addtoFav = async () => {
        const data = {
            id: id,
            account: 20295637,
            state: true
        }
        dispatch(favPost(data))
    }

    const addtowatchList = async () => {
        const data = {
            id: id,
            account: 20295637,
            state: true
        }
        dispatch(watchlistPost(data))
    }


    return (
        <>
            <StatusBar
                translucent
                backgroundColor={Colors.bgBlack}
                barStyle='light-content' />

            <View style={{ flex: 1, height: '100%', width: '100%', backgroundColor: Colors.bgBlack, justifyContent: 'space-between' }}>
                <View>

                    <FastImage source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetailsData.movieDetails?.backdrop_path}` }} resizeMode='contain' style={{ width: '100%', height: 220 }} />
                    {/* Header */}
                    <View style={{ width: '100%' }}>
                        <Text style={{ color: Colors.reg, fontSize: 20, fontWeight: 'bold', margin: 10, alignSelf: 'center' }}>{movieDetailsData.movieDetails?.title}</Text>
                        <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-around' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <FastImage source={Images.vote} resizeMode='contain' style={{ width: 25, height: 25, }} tintColor={'green'} />
                                <Text style={{ color: Colors.bgGreyColor, fontSize: 16, }}>{movieDetailsData.movieDetails?.vote_average}</Text>
                            </View>

                            <Text style={{ color: Colors.bgGreyColor, fontSize: 16, }}> {movieDetailsData.movieDetails?.release_date}</Text>
                            <Text style={{ color: Colors.bgGreyColor, fontSize: 16, }}> {movieDetailsData.movieDetails?.runtime}min</Text>

                        </View>
                        <Text style={{ color: Colors.reg, fontSize: 22, margin: 10, marginBottom: 5, fontWeight: 'bold' }}>Prolog</Text>

                        <Text style={{ color: Colors.reg, fontSize: 16, padding: 10 }}>{movieDetailsData.movieDetails?.overview}</Text>

                    </View>
                </View>

                {data &&
                    <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'space-around', alignSelf: 'center', margin: 20 }}>

                        <TouchableOpacity style={{ backgroundColor: Colors.darkGrey, padding: 10, borderRadius: 10 }} onPress={() => { addtoFav() }}>
                            <FastImage source={Images.fav} resizeMode='contain' style={{ width: 40, height: 40 }} tintColor={'pink'} />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ backgroundColor: Colors.darkGrey, padding: 10, borderRadius: 10 }} onPress={() => { addtowatchList() }}>
                            <FastImage source={Images.watchlist} resizeMode='contain' style={{ width: 40, height: 40 }} tintColor={Colors.bgBlack} />
                        </TouchableOpacity>

                    </View>}



            </View>

        </>
    )
}