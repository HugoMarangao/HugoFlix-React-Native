import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/Routes';

export default function App() {
  return (//dessa forma passamos qual sera o primeiro item a ser retratado sendo a Routes o caminho
    <NavigationContainer>
      <StatusBar hidden={true}/>
      <Routes></Routes>
    </NavigationContainer>
  );
}


