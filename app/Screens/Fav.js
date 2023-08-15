import { Keyboard, View, Text, StatusBar, StyleSheet, Dimensions, ScrollView, NetInfo, FlatList, TextInput, Button, Pressable, TouchableOpacity } from "react-native";
import { Colors } from "../Colors";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getfavList } from "../Redux/Slice/GetFav";
import FastImage from "react-native-fast-image";
import { useIsFocused } from "@react-navigation/native";
import CommonButton from "../Components/CommonButton/CommonButton";
import { favPost } from "../Redux/Slice/AddFav";

export default function Fav(props) {

    const dispatch = useDispatch();
    const focused = useIsFocused();

    const favList = useSelector(state => {
        return state.favList
    })

    useEffect(() => {
        dispatch(getfavList({ account: 20295637 }))
    }, [focused])

    useEffect(() => {
        console.log('favList', favList)
    }, [favList])

    const watchlistRemove = async (item) => {

        const data = {
            id: item.id,
            account: 20295637,
            state: false
        }
        dispatch(favPost(data))
        dispatch(getfavList({ account: 20295637 }))

    }

    const renderTrendingMovies = ({ item, index }) => {
        // console.log('item', item)
        return (
            <>
                <View style={{ flexDirection: 'column', margin: 10 }}>

                    <TouchableOpacity style={{ width: 135, height: 200, margin: 5 }} onPress={() => { props.navigation.navigate('Details', { id: item.id }) }} >
                        <FastImage source={{ uri: `https://image.tmdb.org/t/p/w342${item.poster_path}` }} resizeMode='contain' style={{ width: '100%', height: '100%' }} />
                    </TouchableOpacity>
                    <CommonButton title={'Remove'} onPress={() => { watchlistRemove(item) }} backgroundColor={Colors.bgWhite} style={{ height: 40, width: '50' }} borderRadius={10} textStyle={{ color: Colors.bgBlack, fontSize: 16, fontWeight: '600', }} />
                </View>
            </>
        )

    }

    return (
        <>
            <StatusBar
                translucent
                backgroundColor={Colors.bgBlack}
                barStyle='light-content' />

            <View style={{ flex: 1, height: '100%', width: '100%', backgroundColor: Colors.bgBlack, alignItems: 'center', justifyContent: 'center', }}>

                <View style={{ margin: 10 }}>
                    <Text style={{ color: Colors.bgWhite, fontSize: 20, fontWeight: '600' }}>Favorites Movies</Text>

                    <FlatList
                        data={favList.favListdata}
                        renderItem={renderTrendingMovies}
                        keyExtractor={item => item.id}
                        horizontal={false}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        getItemLayout={(data, index) => (
                            { length: 135, offset: 135 * index, index }
                        )}
                    // onEndReached={() => {
                    //     console.log('onEndReached')

                    // }}
                    />

                </View>


            </View>

        </>
    )
}