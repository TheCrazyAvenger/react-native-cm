import {StyleSheet} from 'react-native';
import {colors} from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 33,
  },
  footer: {
    paddingHorizontal: 10,
    marginVertical: 25,
  },
  agreement: {
    color: colors.primary,
    fontSize: 15,
    fontFamily: 'OpenSans-Semibold',
  },
});
