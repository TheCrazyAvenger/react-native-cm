import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  buttonStyle: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    paddingVertical: 15,
  },
  title: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
  },
});
