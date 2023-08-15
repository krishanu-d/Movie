import { View, Text, StatusBar, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../Colors'
import CommonButton from '../Components/CommonButton/CommonButton'
import { Utils } from '../Components/Utils'
import { Values } from '../Components/Values'
import { RequestToken } from '../Redux/Slice/ReqToken'
import { useDispatch, useSelector } from 'react-redux'
import { session } from '../Redux/Slice/LoginSlice'
import { tokenAuthentication } from '../Redux/Slice/TokenAuth'

export default function Login({ navigation }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [userErr, setUserErr] = useState(false)
    const [passErr, setPassErr] = useState(false)
    const dispatch = useDispatch();

    const token = useSelector(state => {
        return state.token
    })

    const sessionId = useSelector(state => {
        return state.usersession
    })


    useEffect(() => {
        dispatch(RequestToken())

    }, [])

    useEffect(() => {
        console.log('sessionId--------->>>', sessionId.status);
        if (sessionId.status == 'success') {
            console.log('sessionId-wwwwwwwwwwwwww-------->>>', sessionId.session_id?.session_id);
            storeSession(sessionId.session_id?.session_id)
            navigation.replace('BottomTabs', { login: true })
        }
    }, [sessionId])


    const storeSession = async (data) => {
        await Utils.storeData(Values.SESSION, data)
    }


    const Login = async () => {

        setUserErr(username == '' ? true : false)
        setPassErr(password == '' ? true : false)

        // console.log("Login Successfully");
        let data = await Utils.getData(Values.REGISTER)
        console.log("Data--------->>>", data);


        if (username != '' && password != '') {
            try {
                data.forEach(element => {
                    if (element.username == username && element.password == password) {
                        console.log("Login Successfully");

                        throw new Error('User Found');
                    } else if (element.username == username && element.password != password) {
                        console.log("Password Failed");
                        setPassErr(true)
                        return;
                    }
                });

            } catch (error) {
                if (error.message == 'User Found') {

                    dispatch(session({ request_token: token.reqToken.request_token }))

                }
            }

        }
    }


    return (
        <>
            <StatusBar
                translucent
                backgroundColor={Colors.bgBlack}
                barStyle='light-content' />

            <View style={{ flex: 1, height: '100%', width: '100%', backgroundColor: Colors.bgBlack, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: '50%', width: '80%', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ color: Colors.reg, fontSize: 26, fontWeight: 'bold', }}>Login</Text>

                    <View style={{ backgroundColor: Colors.themeColor, height: '80%', width: '100%', borderRadius: 50, padding: 20, alignItems: 'center', }}>


                        <TextInput
                            style={{ width: '85%', color: Colors.bgWhite, borderColor: userErr ? Colors.red : Colors.bgGreyColor, borderWidth: 2, borderRadius: 50, padding: 8, paddingLeft: 15, margin: 10, }}
                            placeholder="Username"
                            placeholderTextColor={Colors.bgWhite}
                            onChangeText={text => setUsername(text)}
                            defaultValue={username}
                        />

                        <TextInput

                            style={{ width: '85%', color: Colors.bgWhite, borderColor: passErr ? Colors.red : Colors.bgGreyColor, borderWidth: 2, borderRadius: 50, padding: 8, paddingLeft: 15, margin: 10, marginBottom: 40, }}
                            placeholder="Password"
                            placeholderTextColor={Colors.bgWhite}
                            onChangeText={text => setPassword(text)}
                            defaultValue={password}
                            secureTextEntry={true}
                        />


                        <CommonButton title={'Login'} onPress={Login} backgroundColor={Colors.bgWhite} style={{ height: 50, minWidth: '90%' }} borderRadius={10} textStyle={{ color: Colors.bgBlack, fontSize: 16, fontWeight: '600' }} />

                    </View>

                </View>



            </View>

        </>
    )

}