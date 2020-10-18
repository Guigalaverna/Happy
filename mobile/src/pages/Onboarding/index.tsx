import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Image, Text } from 'react-native';
import { Feather } from '@expo/vector-icons'

import Onboarding from 'react-native-onboarding-swiper';

import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage';

const OnboardingScreen = () => {
  const { navigate } = useNavigation()
  
  AsyncStorage.getItem('firstOpen').then(response => {
    var firstOpen
    if (response === 'true') {
      navigate('OrphanagesMap')
    } else {
      firstOpen = true
      AsyncStorage.setItem('firstOpen', 'true')
      return firstOpen
    }
  })

  return (
    <Onboarding
      onDone={() => navigate}
      containerStyles={styles.container}
      showSkip={false}
      bottomBarHeight={120}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      bottomBarColor='rgba(255, 255, 255, 1)'
      pages={[
        {
          backgroundColor: '#fff',
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
          image: <Image source={require('../../images/Onboarding/OnboardingImage1.png')} />,
          title: 'Leve felicidade para o mundo',
          subtitle: 'Visite orfanatos e mude o dia de muitas crianças',
        },
        {
          backgroundColor: '#fff',
          titleStyles: styles.title2,
          image: <Image source={require('../../images/Onboarding/OnboardingImage2.png')} />,
          title: 'Escolha um orfanato no mapa e faça uma visita',
          subtitle: '',
        },
      ]}
    />
);}

const Next = () => {
  const { navigate } = useNavigation()

  return (
    <RectButton style={styles.nextButton}>
      <Feather name='arrow-right' size={32} color='#15B6D6'/>
    </RectButton>
  )
}

const Done = () => {
  const { navigate } = useNavigation()

  return (
    <RectButton style={styles.doneButton} onPress={() => navigate('OrphanagesMap')}>
      <Feather name='check' size={32} color='#15B6D6'/>
    </RectButton>
  )
}


export default OnboardingScreen;