import {StyleSheet} from 'react-native';
import {colors} from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  terms: {
    textDecorationLine: 'underline',
    color: colors.primary,
    fontFamily: 'OpenSans-SemiBold',
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 50,
    borderColor: colors.primary,
    borderWidth: 1,
    marginHorizontal: 10,
  },
});
