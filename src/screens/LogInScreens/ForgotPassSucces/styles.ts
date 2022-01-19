import {StyleSheet} from 'react-native';
import {colors} from '@constants';

export const styles = StyleSheet.create({
  header: {
    marginTop: 112,
    marginBottom: 35,
    marginHorizontal: 10,
    alignItems: 'center',
    paddingHorizontal: 35,
  },
  email: {
    color: colors.primary,
    textDecorationLine: 'underline',
    fontFamily: 'OpenSans-Semibold',
  },
});
