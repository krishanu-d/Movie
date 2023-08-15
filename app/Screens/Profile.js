import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Colors } from '../Colors'
import CommonButton from '../Components/CommonButton/CommonButton'
import { Utils } from '../Components/Utils'
import { Values } from '../Components/Values'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Profile(props) {

    const watchlist = async () => {
        // await Utils.storeData(Values.SESSION, null)

    }

    const logout = async () => {
        await AsyncStorage.removeItem(Values.SESSION)
        props.navigation.replace('BottomTabs', { login: false })
    }

    return (
        <>
            <StatusBar
                translucent
                backgroundColor={Colors.bgBlack}
                barStyle='light-content' />

            <View style={{ flex: 1, height: '100%', width: '100%', backgroundColor: Colors.bgBlack, padding: 20 }}>

                <Text style={{ color: Colors.reg, fontSize: 26 }}>Profile</Text>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>


                    <View style={{ width: '100%', marginVertical: 20 }} >

                        <Text style={{ color: Colors.reg, fontSize: 18 }}>name</Text>
                        <View style={{ width: '100%', borderWidth: 1, borderColor: Colors.bgGreyColor, marginVertical: 5 }}></View>
                        <Text style={{ color: Colors.reg, fontSize: 18 }}>email</Text>
                        <View style={{ width: '100%', borderWidth: 1, borderColor: Colors.bgGreyColor, marginVertical: 5 }}></View>
                        <Text style={{ color: Colors.reg, fontSize: 18 }}>phone</Text>
                        <View style={{ width: '100%', borderWidth: 1, borderColor: Colors.bgGreyColor, marginVertical: 5 }}></View>

                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>

                        <CommonButton title={'Favorites'} onPress={() => { props.navigation.navigate('Fav') }} backgroundColor={Colors.bgWhite} style={{ height: 50, minWidth: '40%' }} borderRadius={10} textStyle={{ color: Colors.bgBlack, fontSize: 16, fontWeight: '600' }} />
                        <CommonButton title={'Watchlist'} onPress={() => { props.navigation.navigate('Watchlist') }} backgroundColor={Colors.bgWhite} style={{ height: 50, minWidth: '40%' }} borderRadius={10} textStyle={{ color: Colors.bgBlack, fontSize: 16, fontWeight: '600' }} />

                    </View>

                </View>
                <View style={{ flex: 0.2, justifyContent: 'center' }}>
                    <CommonButton title={'Logout'} onPress={() => { logout() }} backgroundColor={Colors.bgWhite} style={{ height: 50, minWidth: '90%' }} borderRadius={10} textStyle={{ color: Colors.bgBlack, fontSize: 16, fontWeight: '600' }} />
                </View>


            </View>

        </>
    )
}