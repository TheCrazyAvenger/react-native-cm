import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  tabBarLabel: {
    color: colors.white,
  },
  tabBarLabelStyle: {
    textTransform: 'none',
    fontSize: 14.9,
    fontFamily: 'OpenSans-Regular',
  },
  tabBarIndicatorStyle: {
    borderRadius: 19,
    height: 3,
    backgroundColor: colors.white,
  },
  tabBarIndicatorContainerStyle: {
    marginHorizontal: 17,
    paddingHorizontal: 70,
  },
});
