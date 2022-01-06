import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainTitle: {
    fontFamily: 'OpenSans-Bold',
    marginBottom: 20,
    marginHorizontal: 10,
  },
  datePicker: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  buttons: {
    marginTop: 10,
    paddingHorizontal: 9,
    marginBottom: 25,
  },
  expirationStyle: {
    marginLeft: 0,
  },
  cardImage: {
    marginTop: -6,
  },
});
