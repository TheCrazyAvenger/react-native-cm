import {StyleSheet} from 'react-native';
import {colors} from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'rgba(47, 128, 237, 0.3)',
    borderRadius: 5,
  },
  title: {
    fontFamily: 'OpenSans-Regular',
    marginBottom: 20,
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
    marginBottom: 25,
    textAlign: 'justify',
  },
});
