import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, AsyncStorage, TouchableOpacity } from 'react-native'
import { Header, Card, CardSection, Button } from '../../components/common'
import { Appbar, Drawer } from "react-native-paper";
import { DrawerActions } from 'react-navigation-drawer';
import axios from 'axios'
import api from '../../config/api'


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null,
            user: null
        }
        this._getUser()
    }

    _getUser = async () => {
        const user = await AsyncStorage.getItem('user');

        console.log('user in getuser', JSON.parse(user))
        this.setState({ user: JSON.parse(user) })
        this._getMyPosts();
    }

    async _getMyPosts() {
        const user = this.state.user
        const email = await user.email

        await axios.get(`${api}/post/getmyposts/${email}`)
            .then(response => {
                console.log('my post response------->', response.data)
                this.setState({ posts: response.data })
            }).catch(err => {
                console.log('post error--------->', err)
            })
    }


    render() {
        // console.log('POSTS---------->', this.state.posts)
        return (
            <ScrollView style={styles.constainerStyle}>
                <Appbar.Header>
                    <Appbar.Action
                        icon="menu"
                        onPress={() =>
                            this.props.navigation.dispatch(DrawerActions.toggleDrawer())
                        }
                    />
                    <Appbar.Content title="My Posts" />
                </Appbar.Header>
                {/* <Header headerText='My Posts' /> */}
                <Text>{'\n'}</Text>

                <Card>
                    {!!this.state.posts && this.state.posts.map((item, key) => {
                        return (
                            <TouchableOpacity key={key} onPress={() => this.props.navigation.navigate('MyPostDetails', { post: item })} >
                                <CardSection>
                                    <View style={{ flex: 1, margin: 5, marginLeft: 15, marginRight: 15 }}>
                                        <Text style={{fontSize:20}}>Required {item.units} units of {item.bloodGroup} </Text>
                                        <Text style={{fontSize:15}}>at {item.hospital}</Text>
                                        <Text style={{fontSize:15,color:'#f50041'}} >Status: {item.status}</Text>
                                    </View>
                                </CardSection>
                            </TouchableOpacity>

                        )
                    })}
                </Card>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    constainerStyle: {
        flex: 1,

    }
})

export default index