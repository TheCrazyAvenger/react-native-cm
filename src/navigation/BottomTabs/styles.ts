import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  navigatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  tabBarStyle: {
    backgroundColor: 'transparent',
    height: 60,
    borderTopWidth: 0,
    elevation: 30,
  },
  tabBarLabel: {
    marginBottom: 10,
    fontFamily: 'OpenSans-Regular',
    fontSize: 10,
    lineHeight: 13.62,
  },

  xFillLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: colors.white,
  },
});
