import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'

import styles from './styles'

import mapMarker from '../../images/mapMarker.png'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

interface OrphanageItems {
  id: number,
  name: string,
  latitude: number,
  longitude: number
}



const App = () => {
  const [orphanages, setOrphanges] = useState<OrphanageItems[]>([])

  const { navigate } = useNavigation()

  function handleNavigateToOrphanageDetails(id: number) {
    navigate('OrphanageDetails', { id })
  }
  
  useFocusEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanges(response.data)
    })
  })

  return (
    <View style={styles.container}>
      <StatusBar style='dark'/>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map} 
        initialRegion={{
          latitude: -23.5314183,
          longitude: -46.4489193,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        { orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            >
            <Callout 
              tooltip={true}
              onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}
            >
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
              </View>
            </Callout>
          </Marker>
          )
        } )}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>

        <RectButton
          style={styles.createOrphanageButton}
          onPress={() => {
            navigate('SelectMapPosition')
          }}
        >
          <Feather name='plus' size={20} color='white' />
        </RectButton>
      </View>
    </View>
  );
}



export default App