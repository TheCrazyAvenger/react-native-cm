import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  tabBarContentContainerStyle: {
    height: 35,
    border: 0,
    width: '100%',
  },
  tabBarLabelStyle: {
    textTransform: 'none',
    fontSize: 14.9,
    width: 300,
    marginTop: -10,
    fontFamily: 'OpenSans-Regular',
  },
  tabBarIndicatorStyle: {
    borderRadius: 19,
    bottom: -1,
    height: 3,
  },
  tabBarIndicatorContainerStyle: {
    marginHorizontal: 10,
    paddingHorizontal: 50,
  },
});
