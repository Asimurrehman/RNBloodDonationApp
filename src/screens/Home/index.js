import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { Header, Card, CardSection, Button } from '../../components/common'
import axios from 'axios'
import api from '../../config/api'


class index extends Component {
    // state = {
    //     posts: null
    // }

    // async componentDidMount() {
    //     await axios.get(`${api}/post/getall/`)
    //         .then(response => {
    //             // console.log('post response------->', response.data)
    //             this.setState({ posts: response.data })
    //         }).catch(err => {
    //             console.log('post error--------->', err)
    //         })
    // }


    render() {
        // console.log('POSTS---------->', this.state.posts)
        return (
            <ScrollView style={styles.constainerStyle   }>
                <Header headerText='Feed' />
                <Text>{'\n'}</Text>
                <Card>
                    
                    
                            
                                            
                    <CardSection>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={{fontSize:20, fontWeight:'bold'}}>Name : Asim khan </Text>
                        <Text style={{fontSize:15, fontWeight:'bold'}}>Urgency : 5</Text>
                        <Text style={{fontSize:15, fontWeight:'bold'}}>Contact at : 03412286205</Text>
                        <Text style={{fontSize:15, fontWeight:'bold'}}>Additional Instructions : yes we need blood so urgent</Text>
                        <Text style={{fontSize:15, fontWeight:'bold'}}>Volunteer uptill now : 3</Text>
            <Text>{'\n'}</Text>
                        
                        <View style={{ flexDirection: 'row' }}><Button>Volunteer</Button><Button>Comment</Button></View>
                    </View>
                </CardSection>
                            
                            
                      
                </Card>
                <Card>
                    
                    
                            
                    <CardSection>
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={{fontSize:20, fontWeight:'bold'}}>Name : Asim khan </Text>
                            <Text style={{fontSize:15, fontWeight:'bold'}}>Urgency : 5</Text>
                            <Text style={{fontSize:15, fontWeight:'bold'}}>Contact at : 03412286205</Text>
                            <Text style={{fontSize:15, fontWeight:'bold'}}>Additional Instructions : yes we need blood so urgent</Text>
                            <Text style={{fontSize:15, fontWeight:'bold'}}>Volunteer uptill now : 3</Text>
                <Text>{'\n'}</Text>
                            
                            <View style={{ flexDirection: 'row' }}><Button>Volunteer</Button><Button>Comment</Button></View>
                        </View>
                    </CardSection>
                  
                
          
    </Card>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    constainerStyle: {
        flex: 1,
        marginTop:20
    }
})

export default index