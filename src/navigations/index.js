import React from "react";
import { ScrollView, Text, Image, View, AsyncStorage } from "react-native";
import { Appbar, Drawer } from "react-native-paper";
import { SafeAreaView } from "react-navigation";
import { createAppContainer, createSwitchNavigator, } from 'react-navigation'
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'

import SignUp from '../screens/SignUp'
import SignIn from '../screens/SignIn'
import Homes from '../screens/Home'
import MyRequests from '../screens/MyRequests'
import PostRequirement from '../screens/PostRequirement'
import Notifications from '../screens/Notifications'
import Settings from '../screens/Settings'
import PostDetails from '../screens/PostDetails'
import MyPostDetails from '../screens/MyPostDetails'
import AuthLoading from '../screens/AuthLoading'


const AuthNavigator=createSwitchNavigator({
    SignIn:{
        screen:SignIn
    },
    SignUp:{
        screen:SignUp
    }
})

const CustomDrawerComponent=(props)=>{
    // const user = JSON.parse(props.navigation.state.params.user)
    //  console.log('user in nav', JSON.parse(props.navigation.state.params.user))
    return(
        < ScrollView >
        <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}  >
            
                 <View style={{ flex: 1, padding: 23 }}>
                    <Text style={{ fontSize: 23, color: "#F50041", fontWeight: "bold", fontStyle: "italic" }}>ASIM KHAN</Text>
                    <Text style={{ fontSize: 18, color: "#F50041", fontWeight: "bold" }}>A-Negative</Text>
                    <Text style={{ color: "#F50041" }}>syedasimurrehman@gmail.com</Text>
                </View>
        


            <Drawer.Item
                icon='home'
                label='Home'
                active="true"
              
                onPress={() => props.navigation.navigate("Home")}
            />
            <Drawer.Item
                icon='inbox'
                label="My Requests"
                active="true"
                onPress={() => props.navigation.navigate("MyRequests")}
            />
            <Drawer.Item
                icon='send'
                label="Post Requirement"
                active="true"
                onPress={() => props.navigation.navigate("PostRequirement")}
            />
            <Drawer.Item
                icon='inbox'
                label="Notification"
                active="true"
                onPress={() => props.navigation.navigate("Notifications")}
            />
                <Drawer.Item
                    icon='close'
                    label="Log Out"
                    active="true"
                    onPress={() => {
                        AsyncStorage.clear();
                        props.navigation.navigate("Auth")
                    }}
                />
            <Drawer.Item
                icon='settings'
                label="Settings"
                active="true"
                onPress={() => props.navigation.navigate("Settings")}
            />
           
           
        </SafeAreaView>
    </ScrollView >
    )

}

const AppNavigator=createStackNavigator({
    PostDetails:{
        screen:PostDetails,
        navigationOptions:{
            headerTitle: "Post Details",
            headerTintColor: "#fff",
            headerStyle: {
                backgroundColor: "#F50041"
            }
        }
    },
    MyPostDetails:{
screen:MyPostDetails,
navigationOptions:{
    headerTitle: "My Post Details",
    headerTintColor: "#fff",
    headerStyle: {
        backgroundColor: "#F50041"
    }
}
    },
    MainScreen:{
        screen: createDrawerNavigator({
Home:{
    screen:Homes
},
MyRequests:{
    screen:MyRequests
},
PostRequirement:{
    screen:PostRequirement
},
Notifications:{
    screen:Notifications
},
Settings:{
    screen : Settings
}

},{

   initialRouteName: 'Home',
   contentComponent: CustomDrawerComponent

        }
    ),
    navigationOptions:{
        header:null
    }
    }

},

{

    initialRouteName:'MainScreen'
}
)


const MainNavigator = createSwitchNavigator({
AuthLoading:{
screen:AuthLoading
},
    Auth: {
        screen: AuthNavigator
    },
    App:{
        screen:AppNavigator
    } ,

},
    {
        initialRouteName: 'AuthLoading'
    })


export default createAppContainer(MainNavigator)