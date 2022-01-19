import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  header: {
    marginVertical: 18,
    paddingHorizontal: 10,
  },
  line: {
    backgroundColor: colors.primary,
    marginTop: 44,
    marginBottom: 24,
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    marginBottom: 12,
  },
  info: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    marginBottom: 5,
  },
  infoTitle: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 20,
  },
  infoText: {
    textAlign: 'center',
  },
});
