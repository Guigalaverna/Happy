import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker'


import styles from './styles'
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../../services/api';

interface OrphanageDataRouteParams {
  position: {
    latitude: number,
    longitude: number
  }
}

export default function OrphanageData() {
  const { params } = useRoute()

  const routeParams = params as OrphanageDataRouteParams

  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(false)
  const [images, setImages] = useState<string[]>([])

  const navigation = useNavigation()

  const { latitude, longitude } = routeParams.position

  const handleCreateOrphanage = async() => {
    console.log({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    })

    const data = new FormData()

    data.append('name', name)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('about', about)
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))

    images.forEach((image, index) => {
      data.append('images', { 
        name: `image_+${index}.jpg`,
        type: 'image/jpg',
        uri: image,
      } as any)
    })

    await api.post('orphanages', data)

    navigation.navigate('OrphanagesMap')
  }

  const handleSelectImages = async() => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync()

    if(status !== 'granted' ) {
      alert('Eita precisamos de acesso a suas fotos...')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    })

    if(result.cancelled) {
      return
    }

    const { uri: image } = result

    setImages([...images, image ])
  }


  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text  style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        value={name}
        style={styles.input}
        onChangeText={setName}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        value={about}
        style={[styles.input, { height: 110 }]}
        onChangeText={setAbout}
        multiline
      />
{/* 
      <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
      /> */}

      <Text style={styles.label}>Fotos</Text>

      <View style={styles.uploadedImagesContainer}>
        { images.map(image => {
          return (
            <Image 
              key={image}
              source={{ uri: image }}
              style={styles.uploadedImage}
            />
          )
        })}
      </View>
      <TouchableOpacity style={styles.imagesInput} onPress={() => handleSelectImages()}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        value={instructions}
        style={[styles.input, { height: 110 }]}
        onChangeText={setInstructions}
        multiline
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        value={opening_hours}
        style={styles.input}
        onChangeText={setOpeningHours}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch 
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={open_on_weekends}
          onValueChange={setOpenOnWeekends}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}