import React, {useContext} from 'react'
import UserNavigation from '../user/navigation/UserNavigation'
import NewNavigation from '../news/navigation/NewNavigation'
import { UserContext } from '../user/utilities/UserContext'
import { NavigationContainer } from '@react-navigation/native'
const AppNavigation = () => {
    const {isLoggedIn} = useContext(UserContext);
  return (
    <NavigationContainer>
        {isLoggedIn ? <NewNavigation/> : <UserNavigation/>}
    </NavigationContainer>
  )
}

export default AppNavigation