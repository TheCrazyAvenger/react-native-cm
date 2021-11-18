import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    maxWidth: '100%',
  },
  buttonStyle: {
    backgroundColor: colors.white,
    borderWidth: 1.2,
    borderRadius: 5,
    paddingVertical: 12,
  },
  solid: {
    backgroundColor: colors.primary,
  },
  solidTitle: {
    color: colors.white,
  },
  title: {
    fontFamily: 'OpenSans-SemoBold',
    fontSize: 16,
    color: colors.primary,
  },
  disable: {
    backgroundColor: '#C1D9FA',
    borderColor: '#C1D9FA',
  },
  disableTitle: {
    color: colors.white,
  },
});
