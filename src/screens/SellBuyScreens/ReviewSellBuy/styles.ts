import {StyleSheet} from 'react-native';
import {colors} from '@constants';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
    padding: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'rgba(47, 128, 237, 0.3)',
    borderRadius: 5,
  },
  title: {
    fontFamily: 'OpenSans-Regular',
    marginBottom: 20,
  },
  timer: {
    marginVertical: 20,
    color: colors.primary,
    alignSelf: 'center',
    fontFamily: 'OpenSans-Bold',
  },
});
