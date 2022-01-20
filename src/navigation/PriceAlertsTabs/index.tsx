import React, {useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {colors, Screens} from '@constants';
import {
  PriceAlertsGold,
  PriceAlertsPalladium,
  PriceAlertsSilver,
  PriceAlertsPlatinum,
} from '@screens';
import {styles} from './styles';
import {PriceAlertsHeader} from '@navigation/PriceAlertsHeader';
import {metals} from '@utilities';
import {Description} from '@Typography';

const Tab = createMaterialTopTabNavigator();

export const PriceAlertsTabs: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={(props: any) => <PriceAlertsHeader props={props} />}
      screenOptions={{
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarContentContainerStyle: styles.tabBarContentContainerStyle,
        tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
        tabBarStyle: {elevation: 0},
        tabBarIndicatorContainerStyle: styles.tabBarIndicatorContainerStyle,
      }}>
      <Tab.Screen
        options={{
          tabBarIndicatorStyle: {
            backgroundColor: metals[0].color,
          },
          tabBarLabel: ({focused}) => (
            <Description
              style={{
                ...styles.tabBarLabelStyle,
                color: focused ? metals[0].color : colors.black,
              }}>
              Gold
            </Description>
          ),
        }}
        name={Screens.priceAlertsGold}
        component={PriceAlertsGold}
      />
      <Tab.Screen
        options={{
          tabBarIndicatorStyle: {
            backgroundColor: metals[1].color,
          },
          tabBarLabel: ({focused}) => (
            <Description
              style={{
                ...styles.tabBarLabelStyle,
                color: focused ? metals[1].color : colors.black,
              }}>
              Silver
            </Description>
          ),
        }}
        name={Screens.priceAlertsSilver}
        component={PriceAlertsSilver}
      />
      <Tab.Screen
        options={{
          tabBarIndicatorStyle: {
            backgroundColor: metals[2].color,
          },
          tabBarLabel: ({focused}) => (
            <Description
              style={{
                ...styles.tabBarLabelStyle,
                color: focused ? metals[2].color : colors.black,
              }}>
              Platinum
            </Description>
          ),
        }}
        name={Screens.priceAlertsPlatinum}
        component={PriceAlertsPlatinum}
      />
      <Tab.Screen
        options={{
          tabBarIndicatorStyle: {
            backgroundColor: metals[3].color,
          },
          tabBarLabel: ({focused}) => (
            <Description
              style={{
                ...styles.tabBarLabelStyle,
                color: focused ? metals[3].color : colors.black,
              }}>
              Palladium
            </Description>
          ),
        }}
        name={Screens.priceAlertsPalladium}
        component={PriceAlertsPalladium}
      />
    </Tab.Navigator>
  );
};
