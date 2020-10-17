import React from 'react';
import { View } from 'react-native';

import { useFonts } from 'expo-font';
import { 
  Nunito_800ExtraBold,
  Nunito_700Bold,
  Nunito_600SemiBold 
} from '@expo-google-fonts/nunito'

import Routes from './src/routes'
import { StatusBar } from 'expo-status-bar';

const App = () => {
  const [fontsLoaded] = useFonts({
    Nunito_800ExtraBold,
    Nunito_700Bold,
    Nunito_600SemiBold
  })

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar translucent={true}/>
      <Routes />
    </>
  );
}

export default App;