
import { View, Text, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../Colors'
import { Dimensions } from 'react-native';
import { TextInput } from 'react-native';
import CommonButton from '../Components/CommonButton/CommonButton';
import { validateConfirmPassword, validateEmail, validatePassword, validatePhoneNumber, validateUsername } from '../Components/Validations';
import { Utils } from '../Components/Utils';
import { Values } from '../Components/Values';
import { Alert } from 'react-native';

export default function Register({ navigation }) {

    const screen_height = Dimensions.get('screen').height;
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [userErr, setUserErr] = useState(false)
    const [phoneErr, setPhoneErr] = useState(false)
    const [emailErr, setEmailErr] = useState(false)
    const [passErr, setPassErr] = useState(false)
    const [cPassErr, setCPassErr] = useState(false)
    const [userData, setUserData] = useState([])

    useEffect(() => {
        getUserData();

    }, [])

    const getUserData = async () => {
        const Data = await Utils.getData(Values.REGISTER)
        // await Utils.storeData(Values.REGISTER, null)
        console.log("Data---/------>>>", Data);
        if (Data) {
            setUserData(Data)
        }
    }



    const registerNew = async () => {

        // setUserErr(!validateUsername(username))
        setPhoneErr(!validatePhoneNumber(phone))
        setEmailErr(!validateEmail(email))
        setPassErr(!validatePassword(password))
        setCPassErr(!validateConfirmPassword(password, cpassword))


        if (
            // validateUsername(username) &&
            validatePhoneNumber(phone) && validateEmail(email) && validatePassword(password) && validateConfirmPassword(password, cpassword)) {
            console.log(userErr, phoneErr, emailErr, passErr, cPassErr);
            // console.log("Register Successfully");
            const data = {
                username: username,
                phone: phone,
                email: email,
                password: password,
            }

            // userData.forEach(element => {
            //    if (element.username == username) {
            //         Alert.alert('Username Already Exist', 'Please try with another username', [{ text: 'OK', onPress: () => { } }], { cancelable: false })
            //         return
            //     }
            // });

            await Utils.storeData(Values.REGISTER, [...userData, data])
            Alert.alert('Registered Successfully', 'Please login to continue', [{ text: 'OK', onPress: () => { } }], { cancelable: false })
            setUsername('')
            setPhone('')
            setEmail('')
            setPassword('')
            setCpassword('')

        }

    }

    const login = () => {
        console.log("Login");
        navigation.navigate('Login')
    }


    return (
        <>
            <StatusBar
                translucent
                backgroundColor={Colors.bgBlack}
                barStyle='light-content' />

            <View style={{ flex: 1, height: '100%', width: '100%', backgroundColor: Colors.bgBlack, alignItems: 'center', justifyContent: 'center' }}>

                <View style={{ height: '80%', width: '80%', alignItems: 'center', justifyContent: 'space-between', }}>

                    <Text style={{ color: Colors.reg, fontSize: 26, fontWeight: 'bold', }}>REGISTER</Text>

                    <View style={{ backgroundColor: Colors.themeColor, height: '90%', width: '100%', borderRadius: 50, padding: 20, alignItems: 'center' }}>

                        <TextInput
                            style={{ width: '85%', color: Colors.bgWhite, borderColor: userErr ? Colors.red : Colors.bgGreyColor, borderWidth: 2, borderRadius: 50, padding: 8, paddingLeft: 15, margin: 10, }}
                            placeholder="Username"
                            placeholderTextColor={Colors.bgWhite}
                            onChangeText={text => setUsername(text)}
                            defaultValue={username}
                        />

                        <TextInput
                            style={{ width: '85%', color: Colors.bgWhite, borderColor: phoneErr ? Colors.red : Colors.bgGreyColor, borderWidth: 2, borderRadius: 50, padding: 8, paddingLeft: 15, margin: 10, }}
                            placeholder="Phone Number"
                            placeholderTextColor={Colors.bgWhite}
                            onChangeText={text => setPhone(text)}
                            defaultValue={phone}
                            keyboardType='numeric'
                        />
                        <TextInput
                            style={{ width: '85%', color: Colors.bgWhite, borderColor: emailErr ? Colors.red : Colors.bgGreyColor, borderWidth: 2, borderRadius: 50, padding: 8, paddingLeft: 15, margin: 10, }}
                            placeholder="Email"
                            placeholderTextColor={Colors.bgWhite}
                            onChangeText={text => setEmail(text)}
                            defaultValue={email}
                        />

                        {/* <TextInput
                            style={{ width: '85%', color: Colors.bgWhite, borderColor: emailErr ? Colors.red : Colors.bgGreyColor, borderWidth: 2, borderRadius: 50, padding: 8, paddingLeft: 15, margin: 10, }}
                            placeholder="Account No"
                            placeholderTextColor={Colors.bgWhite}
                            onChangeText={text => setAccountNo(text)}
                            defaultValue={accountNo}
                        /> */}


                        <TextInput
                            style={{ width: '85%', color: Colors.bgWhite, borderColor: passErr ? Colors.red : Colors.bgGreyColor, borderWidth: 2, borderRadius: 50, padding: 8, paddingLeft: 15, margin: 10, }}
                            placeholder="Password"
                            placeholderTextColor={Colors.bgWhite}
                            onChangeText={text => setPassword(text)}
                            defaultValue={password}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        <TextInput
                            style={{ width: '85%', color: Colors.bgWhite, borderColor: cPassErr ? Colors.red : Colors.bgGreyColor, borderWidth: 2, borderRadius: 50, padding: 8, paddingLeft: 15, margin: 10, marginBottom: 40, }}
                            placeholder="Confirm Password"
                            placeholderTextColor={Colors.bgWhite}
                            onChangeText={text => setCpassword(text)}
                            defaultValue={cpassword}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <View style={{ flex: 0.9, justifyContent: 'space-between' }}>

                            <CommonButton title={'Register'} onPress={registerNew} backgroundColor={Colors.bgWhite} style={{ height: 50, minWidth: '90%' }} borderRadius={10} textStyle={{ color: Colors.bgBlack, fontSize: 16, fontWeight: '600' }} />


                            <CommonButton title={'Login'} onPress={login} backgroundColor={Colors.pink} style={{ height: 50, minWidth: '90%' }} borderRadius={10} textStyle={{ color: Colors.bgBlack, fontSize: 16, fontWeight: '600' }} />

                        </View>




                    </View>
                </View>



            </View>

        </>
    )
}