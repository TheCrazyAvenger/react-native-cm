import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  reviewItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  reviewInfo: {
    marginRight: 36,
    marginBottom: 20,
  },
  reviewTitle: {
    color: colors.gray,
    marginBottom: 4,
  },
  reviewText: {
    fontFamily: 'OpenSans-SemiBold',
  },
});
