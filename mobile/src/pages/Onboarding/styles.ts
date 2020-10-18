import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  title: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 39,
    color: '#0089A5',
    maxWidth: 240,
    marginLeft: 40,
    marginBottom: 20,
    textAlign: 'left',
  },

  subtitle: {
    marginLeft: 40,
    fontFamily: 'Nunito_600SemiBold',
    color: '#0089A5',
    maxWidth: 240,
    textAlign: 'left'
  },

  title2: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 30,
    color: '#0089A5',
    maxWidth: 500,
    marginRight: 40,
    marginBottom: 20,
    textAlign: 'right',
    textAlignVertical: 'bottom'
  },

  nextButton: {
    backgroundColor: '#D1EDF2',
    width: 56,
    height: 56,

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 20,
    marginRight: 20
  },

  doneButton: {
    backgroundColor: '#D1EDF2',
    width: 56,
    height: 56,

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 20,
    marginRight: 20
  },

  container: {
    alignItems: 'flex-start'
  },
})