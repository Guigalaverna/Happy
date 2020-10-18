import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';

import styles from './styles'

import mapMarkerImg from '../../../images/mapMarker.png';

export default function SelectMapPosition() {
  const navigation = useNavigation()
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })

  function handleNextStep() {
    navigation.navigate("OrphanageData", { position })
  }

  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate)
  }

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: -23.4992307,
          longitude: -47.4573238,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        {position.latitude !== 0 && (
          <Marker
            icon={mapMarkerImg}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude
            }}
          />
        )}
      </MapView>

      {position.latitude !== 0 && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  )
}