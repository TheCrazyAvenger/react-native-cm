import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {colors, Screens} from '@constants';
import {
  HoldingsGold,
  HoldingsPalladium,
  HoldingsPlatinum,
  HoldingsSilver,
} from '@screens';
import {useRoute} from '@react-navigation/native';
import {styles} from './styles';
import {HoldingsHeader} from '@navigation/HoldingsHeader';
import {Animated} from 'react-native';

const Tab = createMaterialTopTabNavigator();

export const HoldinsStack: React.FC = () => {
  const route: any = useRoute();
  const [index, setIndex] = useState(0);

  const {id} = route.params;

  const animation = React.useRef(new Animated.Value(id)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: index,
      duration: 160,
      useNativeDriver: false,
    }).start();
  }, [index]);

  return (
    <Tab.Navigator
      tabBar={(props: any) => (
        <HoldingsHeader index={index} setIndex={setIndex} props={props} />
      )}
      screenOptions={{
        tabBarActiveTintColor: colors.white,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarContentContainerStyle: styles.tabBarContentContainerStyle,
        //@ts-ignore
        tabBarStyle: {
          backgroundColor: animation.interpolate({
            inputRange: [0, 1, 2, 3],
            outputRange: ['#FFBD00', '#2F80ED', '#219653', '#F2994A'],
          }),
          elevation: 0,
        },
        tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
        tabBarIndicatorContainerStyle: styles.tabBarIndicatorContainerStyle,
        tabBarInactiveTintColor: colors.white,
      }}
      initialRouteName={
        id === 1
          ? Screens.holdingsGold
          : id === 2
          ? Screens.holdingsSilver
          : id === 3
          ? Screens.holdingsPlatinum
          : Screens.holdingsPalladium
      }>
      <Tab.Screen
        options={{
          title: 'Gold',
        }}
        name={Screens.holdingsGold}
        component={HoldingsGold}
      />
      <Tab.Screen
        options={{
          title: 'Silver',
        }}
        name={Screens.holdingsSilver}
        component={HoldingsSilver}
      />
      <Tab.Screen
        options={{
          title: 'Platinum',
        }}
        name={Screens.holdingsPlatinum}
        component={HoldingsPlatinum}
      />
      <Tab.Screen
        options={{
          title: 'Palladium',
        }}
        name={Screens.holdingsPalladium}
        component={HoldingsPalladium}
      />
    </Tab.Navigator>
  );
};
