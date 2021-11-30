import {StyleSheet} from 'react-native';
import {colors} from '../../../constants';

export const styles = StyleSheet.create({
  infoBlock: {
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 2,
    height: 2,
    backgroundColor: colors.black,
    borderRadius: 50,
    marginRight: 5,
  },
  linkText: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});
