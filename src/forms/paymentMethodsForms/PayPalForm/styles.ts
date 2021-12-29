import {StyleSheet} from 'react-native';
import {colors} from '@constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 9,
  },
  button: {
    width: '100%',
    marginBottom: 25,
    backgroundColor: '#F6C657',
  },
  title: {
    marginBottom: 5,
    color: colors.gray,
  },
});
