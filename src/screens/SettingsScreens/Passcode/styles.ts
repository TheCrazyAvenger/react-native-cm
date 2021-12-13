import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 40,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 50,
    borderColor: colors.primary,
    borderWidth: 1,
    marginHorizontal: 10,
  },
});
