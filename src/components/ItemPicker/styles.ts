import {StyleSheet} from 'react-native';
import {colors} from '@constants';

export const styles = StyleSheet.create({
  dropdown: {
    height: 45,
    borderWidth: 1,
    borderColor: colors.placeholder,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 25,
    marginHorizontal: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: colors.black,
    fontFamily: 'OpenSans-Regular',
  },
  label: {
    fontFamily: 'OpenSans-Regular',
    marginBottom: 6,
    fontWeight: '400',
    fontSize: 14,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorInput: {
    borderColor: colors.red,
  },
  error: {
    marginLeft: 10,
    marginTop: 10,
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
});
