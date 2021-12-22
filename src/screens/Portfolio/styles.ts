import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  cardTitle: {
    fontFamily: 'OpenSans-Bold',
    color: colors.black,
  },
  cardItem: {
    marginBottom: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noData: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 160,
  },
});
