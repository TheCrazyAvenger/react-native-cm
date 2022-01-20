import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Screens} from '@constants';
import {
  Catalog,
  CatalogGold,
  CatalogSilver,
  CatalogPlatinum,
  CatalogPalladium,
} from '@screens';
import {styles} from './styles';
import {PriceAlertsHeader} from '@navigation/PriceAlertsHeader';

const Tab = createMaterialTopTabNavigator();

export const ReedemTabs: React.FC = () => {
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
          title: 'All',
        }}
        name={Screens.catalog}
        component={Catalog}
      />
      <Tab.Screen
        options={{
          title: 'Gold',
        }}
        name={Screens.catalogGold}
        component={CatalogGold}
      />
      <Tab.Screen
        options={{
          title: 'Silver',
        }}
        name={Screens.catalogSilver}
        component={CatalogSilver}
      />
      <Tab.Screen
        options={{
          title: 'Platinum',
        }}
        name={Screens.catalogPlatinum}
        component={CatalogPlatinum}
      />
      <Tab.Screen
        options={{
          title: 'Palladium',
        }}
        name={Screens.catalogPalladium}
        component={CatalogPalladium}
      />
    </Tab.Navigator>
  );
};
