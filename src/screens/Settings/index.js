import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { Header, Card, CardSection, Button } from '../../components/common'
import { Appbar, Drawer } from "react-native-paper";
import { DrawerActions } from 'react-navigation-drawer';
import axios from 'axios'
import api from '../../config/api'


 class index extends Component {
    render() {
        return (
            <View style={styles.container}>
              <Appbar.Header >
                    <Appbar.Action
                        icon="menu"
                        onPress={() =>
                            this.props.navigation.dispatch(DrawerActions.toggleDrawer())
                        }
                    />
                    <Appbar.Content title="Settings" />
                </Appbar.Header>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
  
    },
});


export default  index