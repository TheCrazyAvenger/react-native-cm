import {StyleSheet} from 'react-native';
import {colors} from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'flex-end',
    padding: 24,
    paddingBottom: 29.5,
  },
  menu: {
    backgroundColor: colors.white,
    padding: 26,
    borderRadius: 14,
  },
  closeButton: {
    width: 52,
    height: 52,
    backgroundColor: colors.white,
    alignSelf: 'center',
    marginTop: 16,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
