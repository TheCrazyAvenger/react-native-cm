import {StyleSheet} from 'react-native';
import {colors} from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    padding: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'rgba(47, 128, 237, 0.3)',
    borderRadius: 5,
  },
  mainTitle: {
    fontFamily: 'OpenSans-Regular',
    marginBottom: 15,
    marginHorizontal: 10,
  },
  infoText: {
    fontFamily: 'OpenSans-SemiBold',
  },
  info: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',

    marginHorizontal: 10,
    marginBottom: 15,
  },
  infoItem: {
    marginBottom: 20,
    marginRight: 35,
  },
  infoTitle: {
    color: colors.gray,
    marginBottom: 4,
  },
});
