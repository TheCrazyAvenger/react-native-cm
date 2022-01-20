import React, {useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {colors, Screens} from '@constants';
import {
  HoldingsGold,
  HoldingsPalladium,
  HoldingsPlatinum,
  HoldingsSilver,
} from '@screens';
import {useRoute} from '@react-navigation/native';
import {metals} from '@utilities';
import {styles} from './styles';
import {HoldingsHeader} from '@navigation/HoldingsHeader';

const Tab = createMaterialTopTabNavigator();

export const HoldinsStack: React.FC = () => {
  const route: any = useRoute();
  const [index, setIndex] = useState(0);

  const {id} = route.params;

  return (
    <Tab.Navigator
      tabBar={(props: any) => (
        <HoldingsHeader index={index} setIndex={setIndex} props={props} />
      )}
      screenOptions={{
        tabBarActiveTintColor: colors.white,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarContentContainerStyle: styles.tabBarContentContainerStyle,
        tabBarStyle: {backgroundColor: metals[index].color, elevation: 0},
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
