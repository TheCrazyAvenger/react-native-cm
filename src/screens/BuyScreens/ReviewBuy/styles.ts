import {StyleSheet} from 'react-native';
import {colors} from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
    padding: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'rgba(47, 128, 237, 0.3)',
    borderRadius: 5,
  },

  title: {
    fontFamily: 'OpenSans-Regular',
    marginBottom: 20,
  },
  reviewItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginBottom: 20,
  },

  info: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginHorizontal: 10,
  },
  infoItem: {
    marginBottom: 20,
    marginRight: 35,
  },
  infoTitle: {
    color: colors.gray,
    marginBottom: 4,
  },
  infoText: {
    fontFamily: 'OpenSans-SemiBold',
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginHorizontal: 10,
  },
  priceTitle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 22,
  },
  timer: {
    marginVertical: 20,
    color: colors.primary,
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
  },
});
