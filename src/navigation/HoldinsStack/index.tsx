import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {colors, Screens} from '@constants';
import {
  HoldingsGold,
  HoldingsPalladium,
  HoldingsPlatinum,
  HoldingsSilver,
} from '@screens';
import {useNavigation, useRoute} from '@react-navigation/native';
import {metals} from '@utilities';
import {styles} from './styles';

const Tab = createMaterialTopTabNavigator();

export const HoldinsStack: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const {id} = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: metals[id - 1].color,
      },
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.white,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarStyle: {
          backgroundColor: metals[id - 1].color,
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
