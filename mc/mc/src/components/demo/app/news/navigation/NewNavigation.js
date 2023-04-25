import React from 'react'
import { Image,Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../screens/Home'
import Detail from '../screens/Detail'
import Add from '../screens/Add'

const Tab = createBottomTabNavigator();



const NewNavigation = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? require('../../../../../media/images/HomeIsActive.png')
            : require('../../../../../media/images/HomeIsNotActive.png');
        } else if (route.name === 'Add') {
          iconName = focused
            ? require('../../../../../media/images/PlusIsActive.png')
            : require('../../../../../media/images/PlusNotIsActive.png');
        }

        return <Image source={iconName} style={{ width: 18, height: 18.73 }} />;
      },
    })}>
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="Detail" component={Detail}/>
        <Tab.Screen name="Add" component={Add}/>
    </Tab.Navigator>
  )
}

export default NewNavigation