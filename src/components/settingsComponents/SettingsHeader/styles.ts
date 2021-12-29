import {StyleSheet} from 'react-native';
import {colors} from '@constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 49,
  },
  userName: {
    fontFamily: 'OpenSans-Bold',
    color: colors.primary,
    fontSize: 22,
    maxWidth: '100%',
  },
  verified: {
    borderWidth: 1,
    marginBottom: 25,
    borderRadius: 48,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
