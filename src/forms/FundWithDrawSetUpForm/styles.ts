import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  price: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginHorizontal: 10,
  },
  eCheckPicker: {
    marginBottom: 0,
    height: 70,
  },
  pickerPlaceholder: {
    fontSize: 14,
  },
  title: {
    color: colors.gray,
    marginBottom: 6,
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    fontWeight: '400',
    marginHorizontal: 10,
  },
  priceTitle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 22,
  },
});
