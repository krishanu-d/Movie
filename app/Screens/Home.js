import { Keyboard, View, Text, StatusBar, StyleSheet, Dimensions, ScrollView, NetInfo, FlatList, TextInput, Button, Pressable, TouchableOpacity } from "react-native";
import { Colors } from "../Colors";
import React, { useState, useEffect } from 'react';
import FastImage from "react-native-fast-image";
import { Images } from "../Images/images";
import { useDispatch, useSelector } from 'react-redux';
import { trendingMovies } from '../Redux/Slice/Trending';
import { allMovies } from "../Redux/Slice/AllMovies";
import { details } from "../Redux/Slice/DetailsSlice";
import { watchList } from "../Redux/Slice/GetWatch";
import { useIsFocused } from "@react-navigation/native";






export default function Home(props) {

    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const focused = useIsFocused();
    const trendingMoviesData = useSelector(state => {
        return state.trending
    })
    const allMoviesData = useSelector(state => {
        return state.movies
    })

    const watchlist = useSelector(state => {
        return state.listWatch
    })




    useEffect(() => {
        dispatch(trendingMovies())
        dispatch(allMovies())

    }, [focused])



    useEffect(() => {
        dispatch(watchList(20295637))
    }, [focused])


    const renderTrendingMovies = ({ item, index }) => {
        // console.log('item', item)
        return (
            <>
                <TouchableOpacity style={{ width: 135, height: 200, margin: 5 }} onPress={() => { props.navigation.navigate('Details', { id: item.id }) }} >
                    <FastImage source={{ uri: `https://image.tmdb.org/t/p/w342${item.poster_path}` }} resizeMode='contain' style={{ width: '100%', height: '100%' }} />
                </TouchableOpacity>
            </>
        )

    }


    return (
        <>
            <StatusBar
                translucent
                backgroundColor={Colors.bgBlack}
                barStyle='light-content' />

            <View style={{ flex: 1, height: '100%', width: '100%', backgroundColor: Colors.bgBlack }}>

                {/* Header */}
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }}>
                    <Text style={{ color: Colors.bgWhite, fontSize: 18, padding: 10 }}>Hello @Name</Text>
                </View>

                {/* Search Bar */}
                <View style={{ height: 50, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', backgroundColor: Colors.bgGreyColor, borderRadius: 10, margin: 10 }}>
                    <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                        <FastImage source={Images.search} resizeMode='contain' style={{ width: 23, height: 23, tintColor: Colors.bgWhite }} />
                    </TouchableOpacity>
                    <TextInput
                        style={{ width: '85%', color: Colors.bgBlack }}
                        placeholder="Search"
                        placeholderTextColor={Colors.bgBlack}
                        // onChangeText={text => setSearch(text)}
                        defaultValue={search}
                    />

                </View>

                <ScrollView showsVerticalScrollIndicator={false} >
                    {/* Trending Movies */}
                    <View style={{ margin: 10, }}>
                        <Text style={{ color: Colors.bgWhite, fontSize: 20, fontWeight: '600' }}>Trending Movies</Text>

                        <FlatList
                            data={trendingMoviesData.trendingMoviesList}
                            renderItem={renderTrendingMovies}
                            keyExtractor={item => item.id}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            getItemLayout={(data, index) => (
                                { length: 135, offset: 135 * index, index }
                            )}
                        // onEndReached={() => {
                        //     console.log('onEndReached')

                        // }}
                        />


                    </View>

                    {/* Watchlist Movies */}
                    <View style={{ margin: 10 }}>
                        <Text style={{ color: Colors.bgWhite, fontSize: 20, fontWeight: '600' }}>Watchlist Movies</Text>

                        <FlatList
                            data={watchlist.watch}
                            renderItem={renderTrendingMovies}
                            keyExtractor={item => item.id}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            getItemLayout={(data, index) => (
                                { length: 135, offset: 135 * index, index }
                            )}
                        // onEndReached={() => {
                        //     console.log('onEndReached')

                        // }}
                        />

                    </View>

                    {/* All Movies */}
                    <View style={{ margin: 10 }}>
                        <Text style={{ color: Colors.bgWhite, fontSize: 20, fontWeight: '600' }}>All Movies</Text>

                        <FlatList
                            data={allMoviesData.allMoviesList}
                            renderItem={renderTrendingMovies}
                            keyExtractor={item => item.id}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            getItemLayout={(data, index) => (
                                { length: 135, offset: 135 * index, index }
                            )}
                        // onEndReached={() => {
                        //     console.log('onEndReached')

                        // }}
                        />


                    </View>

                </ScrollView>

            </View>

        </>
    )
}