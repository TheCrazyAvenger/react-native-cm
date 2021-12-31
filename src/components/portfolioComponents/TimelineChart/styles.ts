import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  tickLabels: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: colors.gray,
  },
  chartWrapper: {
    backgroundColor: colors.lightGray,
    marginTop: 0,
    marginHorizontal: 40,
    marginBottom: 12,
  },
});
