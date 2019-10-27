import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Alert, Image, ScrollView, AsyncStorage, Picker, ActivityIndicator } from 'react-native';
import { Header, Card, CardSection, Input, Button, TextArea } from '../../components/common'
import { Appbar, Drawer } from "react-native-paper";
import { DrawerActions } from 'react-navigation-drawer';
import axios from 'axios'
import api from './../../config/api'


class PostRequirement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bloodGroup: "",
            units: '',
            urgency: "",
            country: "",
            state: "",
            city: "",
            hospital: "",
            contactNo: "",
            instructions: "",
            relation: "",
            user: null
        }
        this._getUser();

    }

    async _getUser() {
        const user = await AsyncStorage.getItem('user');
        this.setState({ user: JSON.parse(user) })
    }

    _post() {
        const { bloodGroup, units, urgency, country, state, city, hospital, contactNo, instructions, relation, user } = this.state

        //  console.log(bloodGroup,units,urgency,country,state,hospital,contactNo,instructions,user)
        if (bloodGroup.length === 0 || units.length === 0 || urgency.length === 0 || country.length === 0 || state.length === 0 || city.length === 0 || hospital.length === 0 || contactNo.length === 0 || instructions.length === 0 || relation.length === 0) {
            Alert.alert(
                'Oops Error Ocurr ?',
                'Please fill all fields',
                [
                    { text: 'OK', onPress: () => console.log('OK') },
                ],

            );
        }
        else {
            axios.post(`${api}/post/bloodrequirement`, {
                bloodGroup,
                units,
                urgency,
                country,
                state,
                city,
                hospital,
                contactNo,
                instructions,
                relation,
                email: user.email,
                fullName: user.FirstName + ' ' + user.LastName,
                createdAt: Date.now(),
                required: units
            }).then(response => {
                console.log('POST  response-------', response.data)
                alert('Blood request successfully posted')
                this.props.navigation.navigate('Home')
            }).catch(err => {
                console.log('post error----------->', err)
            })
        }

    }

    render() {
        const { containerStyle, createFormContainer, drawerStyle, drawerViewStyle } = styles
        const { bloodGroup, units, urgency, country, state, city, hospital, contactNo, instructions, relation } = this.state
        return (
            <ScrollView style={containerStyle}>
                <KeyboardAvoidingView enabled behavior='padding' >
                    <Appbar.Header >
                        <Appbar.Action
                            icon="menu"
                            onPress={() =>
                                this.props.navigation.dispatch(DrawerActions.toggleDrawer())
                            }
                        />
                        <Appbar.Content title="Blood Requirement" />
                    </Appbar.Header>
                    {/* <Header headerText='BLOOD REQUIREMENT' /> */}

                    <View style={createFormContainer}>
                        <Card>

                            <CardSection>
                                <View style={drawerViewStyle}>
                                    <Picker
                                        selectedValue={bloodGroup}
                                        style={drawerStyle}

                                        onValueChange={(itemValue, itemIndex) => this.setState({ bloodGroup: itemValue })}
                                    >
                                        <Picker.Item label="Blood Group" value="" />
                                        <Picker.Item label="A Positive" value="A Positive" />
                                        <Picker.Item label='B Positive' value='B Positive' />
                                        <Picker.Item label='O Nagative' value='O Nagative' />
                                        <Picker.Item label='A Negative' value='A Negative' />
                                        <Picker.Item label='B Nagative' value='B Nagative' />
                                        <Picker.Item label='O Negative' value='O Negative' />
                                    </Picker>
                                </View>
                            </CardSection>

                            <CardSection>
                                <Input placeholder='e.g. 3' label='Units' value={units} returnKeyType='next' onChangeText={text => this.setState({ units: text })} />
                            </CardSection>

                            <CardSection>
                                <View style={
                                    drawerViewStyle
                                }>
                                    <Picker
                                        selectedValue={urgency}
                                        style={
                                            drawerStyle
                                        }
                                        onValueChange={(itemValue, itemIndex) => this.setState({ urgency: itemValue })}
                                    >
                                        <Picker.Item label="Urgency" value="" />
                                        <Picker.Item label="Urgent" value="Urgent" />
                                        <Picker.Item label='Within 5 hours' value='Within 5 hours' />
                                        <Picker.Item label='Within 12 hours' value='Within 12 hours' />
                                        <Picker.Item label='Within 24 hours' value='Within 24 hours' />
                                        <Picker.Item label='Within 2 days' value='Within 2 days' />
                                        <Picker.Item label='Within Week' value='Within Week' />
                                    </Picker>
                                </View>
                            </CardSection>


                            <CardSection>
                                <View style={drawerViewStyle}>
                                    <Picker
                                        selectedValue={country}
                                        style={drawerStyle}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ country: itemValue })}
                                    >
                                        <Picker.Item label="Country" value="" />
                                        <Picker.Item label="Pakistan" value="Pakistan" />
                                        <Picker.Item label='India' value='India' />
                                        <Picker.Item label='Bangladesh' value='Bangladesh' />
                                    </Picker>
                                </View>
                            </CardSection>

                            <CardSection>
                                <View style={drawerViewStyle}>
                                    <Picker
                                        selectedValue={state}
                                        style={drawerStyle}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ state: itemValue })}
                                    >
                                        <Picker.Item label='State' value="" />
                                        <Picker.Item label="Sindh" value="Sindh" />
                                        <Picker.Item label='Punjab' value='Punjab' />
                                        <Picker.Item label='K P K' value='K P K' />
                                    </Picker>
                                </View>
                            </CardSection>

                            <CardSection>
                                <View style={drawerViewStyle}>
                                    <Picker
                                        selectedValue={city}
                                        style={drawerStyle}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ city: itemValue })}
                                    >
                                        <Picker.Item label="City" value="" />
                                        <Picker.Item label="Karachi" value="Karachi" />
                                        <Picker.Item label='Lahore' value='Lahore' />
                                        <Picker.Item label='Hydrabad' value='Hydrabad' />
                                    </Picker>
                                </View>
                            </CardSection>

                            <CardSection>
                                <View style={drawerViewStyle}>


                                    <Picker
                                        selectedValue={hospital}
                                        style={drawerStyle}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ hospital: itemValue })}
                                    >
                                        <Picker.Item label="Hospital" value="" />
                                        <Picker.Item label="Ziauddin Hospital" value="Ziauddin Hospital" />
                                        <Picker.Item label='Jinna Hospital' value='Jinna Hospital' />
                                        <Picker.Item label='Agha Khan Hospital' value='Agha Khan Hospiatal' />
                                        <Picker.Item label='Indus Hospital' value='Indus Hospiatal' />
                                        <Picker.Item label='Liaquat National Hospital' value='Liaquat National Hospital' />
                                        <Picker.Item label='Holy Family Hospital' value='Holy Family Hospiatal' />



                                    </Picker>
                                </View>
                            </CardSection>

                            <CardSection>
                                <View style={drawerViewStyle}>
                                    <Picker
                                        selectedValue={relation}
                                        style={drawerStyle}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ relation: itemValue })}
                                    >
                                        <Picker.Item label="Relation" value="" />
                                        <Picker.Item label="Father" value="Father" />
                                        <Picker.Item label='Mother' value='Mother' />
                                        <Picker.Item label='Friend' value='Friend' />
                                        <Picker.Item label='Neighbour' value='Neighbour' />
                                        <Picker.Item label='Nephew' value='Nephew' />


                                    </Picker>
                                </View>
                            </CardSection>

                            <CardSection>
                                <Input placeholder='03XX-XXXXXXX' value={contactNo} label='Contact no.' returnKeyType='next' onChangeText={text => this.setState({ contactNo: text })} />
                            </CardSection>

                            <CardSection>
                                <TextArea placeholder='INFORMATION' value={instructions} label='Addional' onChangeText={text => this.setState({ instructions: text })} />
                            </CardSection>

                            <CardSection>
                                <Button onPress={this._post.bind(this)} >Post</Button>
                            </CardSection>
                        </Card>
                    </View>


                </KeyboardAvoidingView>
            </ScrollView >
        )
    }
}


const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#fff',

    },
    createFormContainer: {
        margin: 5,
        // flexGrow: 2,
        // borderWidth:1,
        marginTop: 15,
        marginBottom: 15
    },
    gotoSigninStyle: {
        // paddingTop: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        flexDirection: 'row',
        // borderWidth: 1
    },
    drawerViewStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    drawerStyle: {
        color: '#000',
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 18,
        height: 50,
        flex: 1,
    }
})


export default PostRequirement