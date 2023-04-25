import React from 'react'; //{ useState, useContext, createContext } 
//import { View, Button, ToastAndroid, Image, Text } from 'react-native';
//import Flexbox from './src/components/demo/Flexbox';
//import Hello from './src/components/demo/Hello';
//import Login from './src/components/demo/Login';
//import Morning from './src/components/demo/Morning';
//import Welcome from './src/components/demo/Welcome';
//import Home from './src/components/demo/Home';
//import Register from './src/components/demo/Register';
//import Screen1 from './src/components/demo/Screen1';
//import Screen2 from './src/components/demo/Screen2';
//import Screen3 from './src/components/demo/Screen3';
import { UserProvider } from './src/components/demo/app/user/utilities/UserContext';
import { NewProvider } from './src/components/demo/app/news/utilities/NewContext';
import AppNavigation from './src/components/demo/app/appNavigations/AppNavigation';
import Add from './src/components/demo/app/news/screens/Add';
const App = () => {
  return (
    <UserProvider>
      <NewProvider>
        <AppNavigation/>
      </NewProvider>
    </UserProvider>
  );
};


export default App;