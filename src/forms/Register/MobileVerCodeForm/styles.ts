import {StyleSheet} from 'react-native';
import {colors} from '@constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 10,
    marginVertical: 25,
  },
  description: {
    color: colors.primary,
    fontFamily: 'OpenSans-Semibold',
  },
});
