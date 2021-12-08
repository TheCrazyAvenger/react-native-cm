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
    marginRight: 20,
    marginBottom: 20,
  },
  transactionTitle: {
    color: colors.gray,
    marginBottom: 4,
  },
  topBorders: {
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
  },
  bottomBorders: {
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
    marginBottom: 20,
  },
  moreButton: {
    marginVertical: 10,
    fontFamily: 'OpenSans-SemiBold',
    color: colors.primary,
  },
});
