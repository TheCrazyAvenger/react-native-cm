import {StyleSheet} from 'react-native';
import {colors} from '../../../../constants';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    padding: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'rgba(47, 128, 237, 0.3)',
    borderRadius: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    marginLeft: 8,
  },
});
