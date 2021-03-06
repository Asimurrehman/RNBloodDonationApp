import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { Header, Card, CardSection, Button } from '../../components/common'
import { Appbar, Drawer } from "react-native-paper";
import { DrawerActions } from 'react-navigation-drawer';
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
                {/* <Header headerText='Notifications' /> */}
                <Appbar.Header >
                    <Appbar.Action
                        icon="menu"
                        onPress={() =>
                            this.props.navigation.dispatch(DrawerActions.toggleDrawer())
                        }
                    />
                    <Appbar.Content title="Notifications" />
                </Appbar.Header>
                <Text>{'\n'}</Text>


                <Card>
                    
                    
                            
                                            
                    <CardSection>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={{fontSize:20, fontWeight:'bold'}}> Asim Khan : Required 3 Unit Of Blood at Ziauddin Hospital </Text>
    
                    
            
                        
                       
                    </View>
                </CardSection>
                            
                            
                      
                </Card>
                <Card>
                    
                    
                            
                    <CardSection>
                    <View style={{ alignSelf: 'center' }}>
                    <Text style={{fontSize:20, fontWeight:'bold'}}>Hakeem : Required 1 Unit Of Blood at Jinnah Hospital </Text>

                
        
                    
                   
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
        
    }
})

export default index