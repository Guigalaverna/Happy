import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

import OrphanagesMap from './pages/OrphanagesMap'
import OrphanageDetails from './pages/OrphanageDetails';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';

import Header from './components/Header'
import OnboardingScreen from './pages/Onboarding';

const Routes = () => {
  return (
    <NavigationContainer>
      <Navigator 
        screenOptions={{ 
          headerShown: false, 
          cardStyle: { backgroundColor: '#F2F3F5'} 
        }}
        >

        <Screen 
          component={OnboardingScreen} 
          name='OnboardingScreen' 
          options={{ 
            header: () => <Header title='Selecione no mapa'/>
          }} 
        />

        <Screen 
          component={OrphanagesMap} 
          name='OrphanagesMap' 
        />

        <Screen 
          component={OrphanageDetails} 
          name='OrphanageDetails' 
          options={{ 
            headerShown: true,
            header: () => <Header showCancel={false} title='Orfanato'/>
          }}
        />

        <Screen
          component={OrphanageData} 
          name='OrphanageData'
          options={{ 
            headerShown: true, 
            header: () => <Header title='Infome dos dados'/>
          }} 
        />

        <Screen 
          component={SelectMapPosition} 
          name='SelectMapPosition' 
          options={{ 
            headerShown: true, 
            header: () => <Header title='Selecione no mapa'/>
          }} 
        />

        

      </Navigator>
    </NavigationContainer>
  )
}

export default Routes