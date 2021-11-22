import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 20,
  },
  dateTitle: {
    color: colors.gray,
    marginBottom: 6,
  },
  date: {
    padding: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.placeholder,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amount: {
    height: 55,
    borderWidth: 1,
    borderColor: colors.placeholder,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  title: {
    color: colors.gray,
    marginBottom: 6,
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
