import {StyleSheet} from 'react-native';
import {colors} from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 18,
  },
  title: {
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  error: {
    marginBottom: 12,
    paddingHorizontal: 10,
  },
});
