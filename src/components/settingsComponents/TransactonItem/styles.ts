import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(47, 128, 237, 0.3)',
  },
  data: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  transactionItem: {
    marginRight: 40,
    marginBottom: 20,
  },
  transactionTitle: {
    color: colors.gray,
    marginBottom: 4,
  },
  topBorders: {
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    marginTop: 20,
  },
  bottomBorders: {
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
  },
  moreButton: {
    marginVertical: 10,
    fontFamily: 'OpenSans-SemiBold',
    color: colors.primary,
  },
  order: {
    color: colors.primary,
    fontFamily: 'OpenSans-SemiBold',
  },
});
