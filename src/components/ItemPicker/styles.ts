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
    color: colors.black,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: colors.black,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
});
