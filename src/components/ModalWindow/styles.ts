import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    paddingBottom: 29.5,
  },
  inner: {
    backgroundColor: colors.white,
    padding: 26,
    borderRadius: 4,
  },
  title: {
    marginBottom: 12,
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center',
  },
});
