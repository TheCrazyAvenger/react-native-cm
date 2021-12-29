import {StyleSheet} from 'react-native';
import {colors} from '@constants';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    padding: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'rgba(47, 128, 237, 0.3)',
    borderRadius: 5,
  },
  stepsTitle: {
    fontFamily: 'OpenSans-Bold',
  },
  title: {
    fontFamily: 'OpenSans-Regular',
    marginBottom: 20,
    width: '90%',
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priceTitle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 22,
  },
  bankWarning: {
    color: colors.gray,
    textAlign: 'justify',
  },
});
