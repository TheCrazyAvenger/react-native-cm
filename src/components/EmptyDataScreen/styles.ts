import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 112,
    alignItems: 'center',
    marginBottom: 37,
    marginHorizontal: 10,
  },
  title: {
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
  },
  description: {
    marginTop: 20,
    textAlign: 'center',
    color: colors.gray,
    paddingHorizontal: 15,
  },
});
