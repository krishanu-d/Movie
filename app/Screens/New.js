import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Colors } from '../Colors'
import CommonButton from '../Components/CommonButton/CommonButton'

export default function New(props) {
    return (
        <>
            <StatusBar
                translucent
                backgroundColor={Colors.bgBlack}
                barStyle='light-content' />

            <View style={{ flex: 1, height: '100%', width: '100%', backgroundColor: Colors.bgBlack, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
                <CommonButton title={'Register'} onPress={() => { props.navigation.navigate('Register') }} backgroundColor={Colors.bgWhite} style={{ height: 50, minWidth: '40%' }} borderRadius={10} textStyle={{ color: Colors.bgBlack, fontSize: 16, fontWeight: '600' }} />


                <CommonButton title={'Login'} onPress={() => { props.navigation.navigate('Login') }} backgroundColor={Colors.pink} style={{ height: 50, minWidth: '40%' }} borderRadius={10} textStyle={{ color: Colors.bgBlack, fontSize: 16, fontWeight: '600' }} />

            </View>

        </>
    )
}