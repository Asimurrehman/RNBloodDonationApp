import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Alert, AsyncStorage, Image, ScrollView, Picker, ActivityIndicator } from 'react-native';
import { Input, Card, CardSection, Button, Spinner } from '../../components/common';
import api from '../../config/api'
import axios from 'axios'
import Toast, { DURATION } from 'react-native-easy-toast'

class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            FirstName: "",
            LastName: "",
            email: "",
            BloodGroup: "",
            Password: "",

        }
    }

    _signup() {
        const { FirstName, LastName, email, Password, BloodGroup } = this.state
        if (FirstName.length === 0 || LastName.length === 0 || email.length === 0 || BloodGroup.length === 0 || Password.length === 0) {
            // this.refs.toes.show('Fill All Field First')
            Alert.alert(
                'Oops Error Ocurr ?',
                'Please fill all fields',
                [
                    { text: 'OK', onPress: () => console.log('OK') },
                ],

            );


        }
        else {
            axios.post(`${api}/SignUp`, {
                FirstName: FirstName,
                LastName: LastName,
                email: email,
                BloodGroup: BloodGroup,
                Password: Password
            }).then(response => {
                console.log('signup response-------', response.data)
                const user = response.data
                AsyncStorage.setItem('user', JSON.stringify(user))
                Alert.alert(
                    'Good Job',
                    'User Added successfully',
                    [
                        { text: 'OK', onPress: () => console.log('OK') },
                    ],

                );


                this.props.navigation.navigate('MainScreen', { user: JSON.stringify(user) })
            }).catch(err => {
                Alert.alert(
                    'Oops Error Ocurr ?',
                    err,
                    [
                        { text: 'OK', onPress: () => console.log('OK') },
                    ],

                );


            })
        }
        // console.log(firstName, lastName, email, password, bloodGroup)
        // axios.post(`${api}/SignUp`, {
        //     FirstName: FirstName,
        //     LastName: LastName,
        //     email: email,
        //     BloodGroup: BloodGroup,
        //     Password: Password
        // }).then(response => {
        //     console.log('signup response-------', response.data)
        //     alert(' Successfully Created!')
        // }).catch(err => {
        //     console.log(' error----------->', err)
        // })

    }


    render() {
        const { containerStyle, createFormContainer, logoContainer, logo, gotoSigninStyle } = styles
        const { FirstName, LastName, email, Password, BloodGroup } = this.state
        return (
            <ScrollView style={containerStyle}>
                <KeyboardAvoidingView enabled behavior='padding'>


                    <View style={logoContainer}>
                        <Image source={require('../../assetss/logo1.jpg')} style={logo} />
                    </View>

                    <View style={createFormContainer}>
                        <Card>

                            <CardSection>
                                <Input placeholder='John' value={FirstName} label='First Name' returnKeyType='next' onChangeText={text => this.setState({ FirstName: text })} />
                            </CardSection>

                            <CardSection>
                                <Input placeholder='Cena' value={LastName} label='Last Name' returnKeyType='next' onChangeText={text => this.setState({ LastName: text })} />
                            </CardSection>


                            <CardSection>
                                <Input placeholder='user@sectorlink.com' value={email} label='Email' returnKeyType='next' onChangeText={text => this.setState({ email: text })} />
                            </CardSection>



                            <CardSection>
                                <View style={{
                                    height: 40, flex: 1, flexDirection: 'row', alignItems: 'center',
                                }}>
                                    <Picker
                                        selectedValue={BloodGroup}
                                        style={{
                                            color: '#000',
                                            paddingLeft: 5,
                                            paddingRight: 5,
                                            fontSize: 18,
                                            height: 50,
                                            flex: 1,
                                        }}

                                        onValueChange={(itemValue, itemIndex) => this.setState({ BloodGroup: itemValue })}
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
                                <Input placeholder='password' value={Password} label='Password' returnKeyType='next' onChangeText={text => this.setState({ Password: text })} secureTextEntry />
                            </CardSection>


                            <CardSection>
                                <Button onPress={this._signup.bind(this)} >Sign Up</Button>
                            </CardSection>
                        </Card>
                    </View>


                    <View style={gotoSigninStyle}>
                        <Text>Already have an account? </Text>
                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity style={{ margin: 5 }} onPress={() => this.props.navigation.navigate('SignIn')}  >
                                <Text style={{ color: '#F50041', fontWeight: 'bold' }}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
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
        marginTop: 20
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        margin: 15,
        // borderWidth:1,
    },
    logo: {
        width: 300,
        height: 120,
        resizeMode: 'stretch'
    },
    createFormContainer: {
        margin: 5,
        // flexGrow: 2,
        // borderWidth:1,
        // marginTop: 50,
        marginBottom: 30
    },
    gotoSigninStyle: {
        // paddingTop: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        flexDirection: 'column',

        // borderWidth: 1
    }
})

export default Signup