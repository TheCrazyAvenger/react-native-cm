import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
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
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    color: colors.primary,
    lineHeight: 21.79,
  },
  disable: {
    backgroundColor: '#C1D9FA',
    borderColor: '#C1D9FA',
  },
  disableTitle: {
    color: colors.white,
  },
});
