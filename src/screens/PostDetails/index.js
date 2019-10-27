import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, KeyboardAvoidingView, Alert, AsyncStorage, TextInput, TouchableOpacity } from 'react-native'
import { Header, Card, CardSection, Button, Input } from '../../components/common'
import axios from 'axios'
import api from '../../config/api'
import moment from 'moment'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'

class index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            comment: "",
            post: this.props.navigation.getParam('post'),
            user: null
        }
        this._getUser()
    }

    _getUser = async () => {
        const user = await AsyncStorage.getItem('user');

        console.log('user in getuser', JSON.parse(user))
        this.setState({ user: JSON.parse(user) })
    }


    _comment() {
        const { post, comment, user } = this.state
        const postId = post._id
        axios.post(`${api}/post/comment/${postId}`, {
            comment: comment,
            createdAt: Date.now(),
            fullName: user.FirstName + ' ' + user.LastName,
            email: user.email
        }).then(response => {
            console.log('COMMENT response------>', response.data)
            // this.refs.toast.show('SUCCESSFULLY COMMENTED')
            alert('successfully added')
            this.setState({ comment: "" })
        }).catch(err => {
            console.log('comment error------>', err)
            // this.refs.toast.show(err)
        })

    }




    render() {
        // console.log('POSTS---------->', this.state.posts)
        const { post, comment } = this.state
        return (
            <ScrollView style={styles.constainerStyle}>
                <KeyboardAvoidingView enabled behavior='padding' >

                    {/* <Header headerText='Post Details'  /> */}
                    <Text>{'\n'}</Text>
                    <Card>
                        <CardSection>
                            <View style={{ flex: 1, margin: 5, marginLeft: 15, marginRight: 15 }}>
                                {/* <Text style={{ marginLeft: 'auto', margin: 5 }} >Star Button</Text> */}

                                <View style={{ justifyContent: 'space-between', flexDirection: 'row',margin:5 }} >
                                    <Text style={{ fontWeight: 'bold' }}>{post.fullName}</Text>
                                    <Text style={{fontWeight:'bold'}}>Time : {moment(post.createdAt).fromNow()}</Text>
                                </View>

                                <Text>Units required: {post.units}</Text>
                                <Text>Donation recieved: {post.recieved}</Text>
                                <Text>Still require: {post.required}</Text>
                                <Text>Blood Group: {post.bloodGroup}</Text>
                                <Text>Location: {post.city} {post.state} {post.country} </Text>
                                <Text>Hospital: {post.hospital}</Text>
                                <Text>Urgency: {post.urgency}</Text>
                                <Text>Relation with patient: {post.relation}</Text>
                                <Text>Contact No: {post.contactNo}</Text>
                                <Text>Additional Instructions: {post.instructions}</Text>
                            </View>
                        </CardSection>
                    </Card>
                    <Card>
                        <CardSection>
                            <View >
                                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#f50041' }}>Voluteer</Text>
                            </View>
                        </CardSection>
                    </Card>
                    <Card>

                        {post.volunteers && post.volunteers.map((item, key) => {
                            return (
                                <View key={key}>
                                    <CardSection>
                                        <View style={{ flex: 1, margin: 5, marginLeft: 15, marginRight: 15 }}>
                                            <Text>{item.fullName}</Text>
                                            <Text>{item.bloodGroup}</Text>
                                            <Text>Exchange Donation</Text>
                                            <Text>{item.status}</Text>
                                        </View>
                                    </CardSection>
                                </View>
                            )
                        })}

                    </Card>

                    <Card>
                        <CardSection>
                            <View>
                                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#f50041' }}>Comments</Text>
                            </View>
                        </CardSection>
                    </Card>
                    <Card>

                        {post.comments && post.comments.map((item, key) => {
                            return (
                                <View key={key}>
                                    <CardSection>
                                        <View style={{ flex: 1, margin: 5, marginLeft: 15, marginRight: 15 }}>
                                            <Text>{item.fullName}</Text>
                                            <Text>{item.comment}</Text>
                                        </View>
                                    </CardSection>
                                </View>
                            )
                        })}
                        <CardSection>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#F50041', borderRadius: 10 }}>
                                <TextInput placeholder='Comment' value={comment} onChangeText={text => this.setState({ comment: text })} style={{ flex: 1 }} />
                                <TouchableOpacity onPress={this._comment.bind(this)}>
                                    <MCIcon name={'send'} color={'#F50041'} size={33} style={{ margin: 5 }} />
                                </TouchableOpacity>
                            </View>
                        </CardSection>

                    </Card>

                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    constainerStyle: {
        flex: 1,
        marginTop: 20
    }
})

export default index