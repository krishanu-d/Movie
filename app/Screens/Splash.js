import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StatusBar, StyleSheet } from "react-native";
import FastImage from 'react-native-fast-image';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { Images } from '../Images/images';
import { Colors } from '../Colors';
import { TransitionView } from '../Components/TransitionView/TransitionView';
import { guestSession } from '../Redux/Slice/GuestSlice';
import { Utils } from '../Components/Utils';
import { Values } from '../Components/Values';

export default function Splash(props) {



    const dispatch = useDispatch();


    useEffect(() => {

        checkAuth()

    }, [])



    const checkAuth = async () => {
        const session = await Utils.getData(Values.SESSION);
        // console.log('SPLASH SCREEN AUTH TOKEN---------->', authToken, info);
        console.log("session DEYAILSSSSSSSSSSSSs--------->>>>", session);
        if (session && session !=null && session !='') {



            setTimeout(() => {
                props.navigation.replace('BottomTabs', { login: true })
            }, 2000)
        }
        else {
            setTimeout(() => {
                props.navigation.replace('BottomTabs', { login: false })
            }, 2000)
        }
    }



    return (
        <>
            <StatusBar
                translucent
                backgroundColor={Colors.bgblack}
            />
            <SafeAreaView style={Styles.mainContainer}>
                <TransitionView animation="slideInDown">
                    <FastImage source={Images.logo} resizeMode='contain' style={Styles.logo} />
                </TransitionView>
            </SafeAreaView>
        </>
    );
}
const Styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.bgWhite,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 180,
        height: 130,
    }
})

