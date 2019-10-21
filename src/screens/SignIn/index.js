import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView, AsyncStorage } from 'react-native'
import { Input, Card, CardSection, Button, Spinner } from '../../components/common'
import api from '../../config/api'
import axios from 'axios'


class SignIn extends Component {

    constructor(props) {
        super(props)
        this.state = {
         email:"",
         Password:""

        }
    }

    _login() {
        const { email, password } = this.state

    

        // console.log(email, password)
        // axios.post(`${api}/Login`, {
        //     email: email,
        //     password: password
        // }).then(response => {
        //     console.log('login response------------>', response.data)
        //     alert(' successfully Login')
        // }).catch(err => {
        //     console.log('error---------->', err.response.data.message)
        //     alert(err.response.data.message)
        // })
        this.props.navigation.navigate('App')
        
    }

    render() {
        const { containerStyle, logoContainer, logo, loginFormContainer, createAccountContainer } = styles
        const { email, Password } = this.state

        return (
            
            <KeyboardAvoidingView enabled behavior='padding' style={containerStyle} >
                <View style={logoContainer}>
                    <Image source={require('../../assetss/logo2.jpg')} style={logo} />
                </View>
                <View style={loginFormContainer}>
                    <Card>
                    <CardSection>
                    <Input placeholder='user@gmail.com' label='Email' value={email} returnKeyType='next' onChangeText={text => this.setState({ email: text })} />
                </CardSection>

                <CardSection>
                    <Input placeholder='password' label='Password' returnKeyType='go' value={Password} secureTextEntry onChangeText={text => this.setState({ Password: text })} />
                </CardSection>

                <CardSection>
                    <Button onPress={this._login.bind(this)} >Sign In</Button>
                </CardSection>

                    </Card>
                </View>

                <View style={createAccountContainer}>
                    <Text>Don't have an account?</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ margin: 3 }}  onPress={()=>this.props.navigation.navigate('SignUp')}>
                            <Text style={{ color: '#F50041', fontWeight: 'bold' }} >Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#fff'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        margin: 15,
        // borderWidth:1,
        marginBottom: 0
    },
    logo: {
        width: 300,
        height:250,
        resizeMode: 'stretch'
    },
    loginFormContainer: {
        // borderWidth:1,
        margin: 2,
        marginTop: 10,
        marginBottom: 10
    },
    createAccountContainer: {
        // paddingTop: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        flexDirection: 'column',
        // borderWidth: 1
    }
})

export default SignIn