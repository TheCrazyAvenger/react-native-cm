import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  amount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountTitle: {
    color: colors.gray,
    marginLeft: 10,
  },
  amountPicker: {
    backgroundColor: colors.white,
    padding: 10,
    position: 'absolute',
    zIndex: 100,
    borderRadius: 5,
    elevation: 4,
    right: 0,
    left: 0,
    bottom: 10,
  },
  pickerWrap: {
    backgroundColor: colors.gray,
    marginVertical: 13,
  },
  mainTitle: {
    fontFamily: 'OpenSans-Regular',
    marginBottom: 20,
    marginHorizontal: 10,
  },
  datePicker: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.gray,
    marginBottom: 6,
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    fontWeight: '400',
    marginHorizontal: 10,
  },
});
