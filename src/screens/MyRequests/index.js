import React, { Component } from 'react'
import {View,StyleSheet,Image,Text} from 'react-native'

export default class index extends Component {
    render() {
        return (
         <View style={styles.container}>
<Text>my requets ...</Text>
         </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });