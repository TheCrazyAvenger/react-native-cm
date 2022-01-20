import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  tabBarContentContainerStyle: {
    height: 35,
    border: 0,
  },
  tabBarLabel: {
    color: colors.white,
  },
  tabBarLabelStyle: {
    textTransform: 'none',
    fontSize: 14.9,
    marginTop: -10,
    fontFamily: 'OpenSans-Regular',
  },
  tabBarIndicatorStyle: {
    borderRadius: 19,
    bottom: 0,
    height: 3,
  },
  tabBarIndicatorContainerStyle: {
    marginHorizontal: 13,
    paddingHorizontal: 50,
  },
});
