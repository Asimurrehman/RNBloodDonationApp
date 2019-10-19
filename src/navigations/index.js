import {createAppContainer,createSwitchNavigator} from 'react-navigation'

import { createDrawerNavigator } from 'react-navigation-drawer';

import SignUp from '../screens/SignUp'
import SignIn from '../screens/SignIn'
import Homes from '../screens/Home'
import MyRequests from '../screens/MyRequests'
import PostRequirement from '../screens/PostRequirement'


const AuthNavigator=createSwitchNavigator({
    SignIn:{
        screen:SignIn
    },
    SignUp:{
        screen:SignUp
    }
})

const AppNavigator = createDrawerNavigator({
    Home: {
        screen:Homes
    },
    MyRequests:{
        screen:MyRequests
    },
    PostRequirement:{
        screen: PostRequirement
    }
  
}, {
   initialRouteName: 'Home'

}
)

const MainNavigator = createSwitchNavigator({
    Auth: {
        screen: AuthNavigator
    },
    App:{
        screen:AppNavigator
    } ,

},
    {
        initialRouteName: 'Auth'
    })


export default createAppContainer(MainNavigator)