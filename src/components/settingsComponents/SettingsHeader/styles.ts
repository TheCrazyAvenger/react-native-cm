import {StyleSheet} from 'react-native';
import {colors} from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 49,
    marginBottom: 25,
  },
  userName: {
    fontFamily: 'OpenSans-Bold',
    color: colors.primary,
  },
  verified: {
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 48,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
