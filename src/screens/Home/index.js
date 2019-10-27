import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, AsyncStorage } from 'react-native'
import { Header, Card, CardSection, Button } from '../../components/common'
import { Appbar, Drawer } from "react-native-paper";
import { DrawerActions } from 'react-navigation-drawer';
import axios from 'axios'
import api from '../../config/api'
import moment from 'moment'


class index extends Component {



    constructor(props) {
        super(props);
        this.state = {
            posts: null,
            user: null,
        }
        this._getUser()
    }

    _getUser = async () => {
        const user = await AsyncStorage.getItem('user');

        console.log('user in getuser', JSON.parse(user))
        this.setState({ user: JSON.parse(user) })
    }



    componentDidMount() {
        this._getPosts();
    }

    async _getPosts() {
        await axios.get(`${api}/post/getall/`)
            .then(response => {
                console.log('home response------->', response.data)
                this.setState({ posts: response.data })
            }).catch(err => {
                console.log('post error--------->', err)
            })
    }
    _addVolunteer(post) {
        const postId = post._id
        const user = this.state.user

        axios.post(`${api}/post/addvolunteer/${postId}`, {
            createdAt: Date.now(),
            bloodGroup: user.BloodGroup,
            status: "Not Donated",
            fullName: user.FirstName + ' ' + user.LastName,
            email: user.email,
        }).then(response => {
            console.log('volunteer response------>', response.data)
            // this.refs.toast.show('VOLUNTEER ADDED')
            alert('volunteer added')
            this.setState({ comment: "" })
        }).catch(err => {
            console.log('volunteer error------>', err)
            // this.refs.toast.show(err)
        })
    }


    render() {
        // console.log('POSTS---------->', this.state.posts)
        return (
            <ScrollView style={styles.constainerStyle}>
                <Appbar.Header >
                    <Appbar.Action
                        icon="menu"
                        onPress={() =>
                            this.props.navigation.dispatch(DrawerActions.toggleDrawer())
                        }
                    />
                    <Appbar.Content title="Feed" />
                </Appbar.Header>
                {/* <Header headerText='Feed' /> */}
                <Text>{'\n'}</Text>
                <Card>



                    {!!this.state.posts && this.state.posts.map((item, key) => {

                        return (
                            <View key={key} >
                                <CardSection>
                                    <View style={{ flex: 1, margin: 5, marginLeft: 15, marginRight: 15 }}>
                                        <View style={{ justifyContent: 'space-between', flexDirection: 'row',margin:5 }} >
                                            <Text style={{ fontWeight: 'bold',fontSize:15 }}>{item.fullName}</Text>
                                            <Text style={{fontWeight:'bold'}}>Time : {moment(item.createdAt).fromNow()}</Text>
                                        </View>

                                        <Text>{item.units} units of {item.bloodGroup} blood required</Text>
                                        <Text>At {item.hospital} for my {item.relation}</Text>
                                        <Text>Urgency: {item.urgency}</Text>
                                        <Text>Contacy at: {item.contactNo}</Text>
                                        <Text>Additional Instructions: {item.instructions}</Text>
                                        <Text>Volunteer uptill now: {item.volunteers ? item.volunteers.length : '0'}</Text>
                                        <Text>Current Requirement: {item.required} </Text>
                                        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                                            <Button onPress={this._addVolunteer.bind(this, item)}>Volunteer</Button>
                                            <Button onPress={() => this.props.navigation.navigate('PostDetails', { post: item })}>Comment</Button>
                                        </View>
                                    </View>
                                </CardSection>
                            </View>
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