import {StyleSheet} from 'react-native';
import {colors} from '@constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    width: '50%',
    marginBottom: 8,
  },
  price: {
    fontFamily: 'OpenSans-Bold',
    marginBottom: 8,
  },
  availability: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inStock: {
    color: 'green',
    marginLeft: 8,
  },
  presale: {
    marginLeft: 8,
  },
});
