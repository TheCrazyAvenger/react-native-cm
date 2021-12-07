import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  headerTitleStyle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
  },
  cart: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9F2FF',
    borderRadius: 50,
  },
  cartLength: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red,
    borderRadius: 50,
    position: 'absolute',
    right: -5,
    top: -5,
  },
  cartText: {
    color: colors.white,
    fontSize: 11,
  },
});
