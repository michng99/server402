import { StyleSheet, Text, View } from 'react-native'
import React, {useState, createContext} from 'react'
import AxiosInstance from '../../axiosClient/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = (props)=>{
    const {children} = props;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // hàm đăng nhập
    const Login = async(email,password)=>{
        try {
            const reponse = await AxiosInstance().post('/auth/login',
            {
                email: email,
                password: password
            }
            );
            const token = reponse.data.token;
            await AsyncStorage.setItem('token',token); // lưu lại token
            setIsLoggedIn(true);
            //console.log('login reponse: ', reponse);
            return true;
        } catch (error) {
           console.log('login error: ', error);
        }
        return false;
    }
    // hàm đăng ký
    const Register = async(email,password)=>{
        try {
            await AxiosInstance().post('/users/register',
            {
                email: email,
                password: password
            }
            );
            return true;
        } catch (error) {
            console.Log('register error: ', error);
        }
        return false;
    }

    return(
        <UserContext.Provider 
            value={{isLoggedIn, setIsLoggedIn, Login,Register}}>
            {children}
        </UserContext.Provider>
    )
}


