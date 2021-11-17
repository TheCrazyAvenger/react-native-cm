import {StyleSheet} from 'react-native';
import {colors} from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  forgotPass: {
    fontFamily: 'OpenSans-Semibold',
    color: colors.primary,
    fontWeight: '600',
    paddingHorizontal: 10,
  },
  footer: {
    marginHorizontal: 10,
    marginVertical: 25,
  },
});
