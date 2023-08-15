import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Keyboard, View, Text, StatusBar, StyleSheet, Dimensions, ScrollView, NetInfo, FlatList, TextInput, Button, Pressable } from "react-native";

import Routes from './Routes';
import { Colors } from '../Colors';
import { Images } from '../Images/images';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Values } from '../Components/Values';
import { Utils } from '../Components/Utils';


const Stack = createStackNavigator();
const hideHeader = { headerShown: false };
const Tab = createBottomTabNavigator();
const screen_height = Dimensions.get('screen').height;


const screenOptions = {


    headerStyle: {
        backgroundColor: Colors.bgWhite,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
    },
    // headerTintColor: Colors.bgBlack,
    headerTitleStyle: {
        fontWeight: '400',
    },
    headerTitleAlign: 'center',

};

const BottomTabsNavigator = (props) => {

    const { login } = props.route.params
    console.log('login', login)

    return (
        <Tab.Navigator initialRouteName='Home' backBehavior='history'
            screenOptions={{
                tabBarStyle: { backgroundColor: Colors.bgGreyColor, height: screen_height * .09 },
                tabBarActiveTintColor: Colors.bgBlack,
                tabBarInactiveTintColor: Colors.bgBlack,
                tabBarLabelStyle: { fontSize: 12, bottom: '10%', },
            }}
        >
            <Tab.Screen name='Home' component={Routes.Home.Screen}
                options={{
                    tabBarLabel: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => (
                        <View style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: focused ? Colors.bgBlack : Colors.bgGreyColor, borderRadius: 10 }}>
                            <FastImage source={Images.home} resizeMode='contain' style={{ width: '70%', height: '70%' }} tintColor={focused ? Colors.bgWhite : Colors.bgBlack} />
                        </View>
                    )
                }}
            />

            {login &&
                <Tab.Screen name='Fav' component={Routes.Fav.Screen}
                    options={{
                        tabBarLabel: 'Fav',
                        headerShown: false,
                        tabBarIcon: ({ focused, color }) => (
                            <View style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: focused ? Colors.bgBlack : Colors.bgGreyColor, borderRadius: 10 }}>
                                <FastImage source={Images.fav} resizeMode='contain' style={{ width: '70%', height: '70%' }} tintColor={focused ? Colors.bgWhite : Colors.bgBlack} />
                            </View>
                        )
                    }}
                />}


            {login &&
                <Tab.Screen name='Profile' component={Routes.Profile.Screen}
                    options={{
                        tabBarLabel: 'Profile',
                        headerShown: false,
                        tabBarIcon: ({ focused, color }) => (
                            <View style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: focused ? Colors.bgBlack : Colors.bgGreyColor, borderRadius: 10 }}>
                                <FastImage source={Images.profile} resizeMode='contain' style={{ width: '70%', height: '70%' }} tintColor={focused ? Colors.bgWhite : Colors.bgBlack} />
                            </View>
                        )
                    }}
                />}

            {
                !login &&

                <Tab.Screen name='New' component={Routes.New.Screen}
                    options={{
                        tabBarLabel: 'Login',
                        headerShown: false,
                        tabBarIcon: ({ focused, color }) => (
                            <View style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: focused ? Colors.bgBlack : Colors.bgGreyColor, borderRadius: 10 }}>
                                <FastImage source={Images.login} resizeMode='contain' style={{ width: '70%', height: '70%' }} tintColor={focused ? Colors.bgWhite : Colors.bgBlack} />
                            </View>
                        )
                    }}
                />




            }




        </Tab.Navigator>
    )

}



const AppStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={Routes.Splash.name} screenOptions={hideHeader} >
            <Stack.Screen name={Routes.Splash.name} component={Routes.Splash.Screen} />
            <Stack.Screen name={'BottomTabs'} component={BottomTabsNavigator} />
            <Stack.Screen name={Routes.Register.name} component={Routes.Register.Screen} />
            <Stack.Screen name={Routes.Login.name} component={Routes.Login.Screen} />
            <Stack.Screen name={Routes.Details.name} component={Routes.Details.Screen} />
            <Stack.Screen name={Routes.New.name} component={Routes.New.Screen} />
            <Stack.Screen name={Routes.Watchlist.name} component={Routes.Watchlist.Screen} />
        </Stack.Navigator>
    )
}

export default function Navigator() {

    return (
        <AppStack />
    )
};