import {StyleSheet} from 'react-native';
import {colors} from '@constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 49,
    marginBottom: 25,
  },
  userInfo: {
    maxWidth: '70%',
  },
  userName: {
    fontFamily: 'OpenSans-Bold',
    color: colors.primary,
    fontSize: 22,
    maxWidth: '100%',
  },
});
