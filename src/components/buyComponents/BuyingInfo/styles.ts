import {StyleSheet} from 'react-native';
import {colors} from '../../../constants';

export const styles = StyleSheet.create({
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginHorizontal: 10,
  },
  infoItem: {
    marginBottom: 20,
    marginRight: 35,
  },
  infoTitle: {
    color: colors.gray,
    marginBottom: 4,
  },
  infoText: {
    fontFamily: 'OpenSans-SemiBold',
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginHorizontal: 10,
  },
  priceTitle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 22,
  },
});
