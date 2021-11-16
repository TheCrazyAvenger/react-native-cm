import {StyleSheet} from 'react-native';
import {colors} from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 0.8,
  },
  dot: {
    width: 6,
    height: 6,
    marginRight: 4,
    backgroundColor: colors.paleBlue,
    borderRadius: 50,
  },
  footer: {
    flex: 0.15,
    paddingHorizontal: 10,
  },
});
