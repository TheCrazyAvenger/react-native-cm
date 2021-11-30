import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

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
    color: colors.gray,
    fontSize: 16,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorLabel: {
    color: colors.red,
  },
  errorInput: {
    borderColor: colors.red,
  },
  error: {
    position: 'absolute',
    left: 10,
    top: 75,
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
});
