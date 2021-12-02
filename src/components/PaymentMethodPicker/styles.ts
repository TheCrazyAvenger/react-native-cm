import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  picker: {
    paddingVertical: 17,
    height: 'auto',
  },
  pickerPlaceholder: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    lineHeight: 21.79,
  },
  title: {
    color: colors.gray,
    marginBottom: 6,
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    fontWeight: '400',
    marginHorizontal: 10,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.placeholder,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 25,
    marginHorizontal: 10,
  },
});
