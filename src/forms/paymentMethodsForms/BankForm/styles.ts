import {StyleSheet} from 'react-native';
import {colors} from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  datePicker: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  buttons: {
    marginTop: 10,
    paddingHorizontal: 9,
    marginBottom: 25,
  },
});
