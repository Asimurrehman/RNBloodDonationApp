import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigations from './src/navigations'
import {Provider as PaperProvider,DefaultTheme} from 'react-native-paper'

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
      ...DefaultTheme.colors,
      primary: '#F50041',
      accent: '#fff',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
    <Navigations />
</PaperProvider>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
