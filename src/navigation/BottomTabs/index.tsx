import React from 'react';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {colors, Screens} from '../../constants';
import {Home, NullString} from '../../screens';
import {styles} from './styles';
import {Platform, View, Image} from 'react-native';

import {TabBarAdvancedButton} from '../TabBarAdvancedButton';

const Tab = createBottomTabNavigator();

export const BottomTabs: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={props => (
        <View style={styles.navigatorContainer}>
          <BottomTabBar {...props} />
          {Platform.OS === 'ios' && (
            <View
              style={[
                styles.xFillLine,
                {
                  backgroundColor: colors.white,
                },
              ]}
            />
          )}
        </View>
      )}
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabel,
      }}>
      <Tab.Screen
        name={Screens.home}
        options={{
          title: 'Home',
          tabBarIcon: ({focused}) => {
            const img = focused
              ? require(`../../assets/images/navigation/home-active.png`)
              : require(`../../assets/images/navigation/home.png`);
            return <Image source={img} />;
          },
          tabBarItemStyle: {
            backgroundColor: colors.white,
            borderTopStartRadius: 27,
          },
        }}
        component={Home}
      />
      <Tab.Screen
        name="Portfolio"
        options={{
          title: 'Portfolio',
          tabBarIcon: ({focused}) => {
            const img = focused
              ? require(`../../assets/images/navigation/portfolio-active.png`)
              : require(`../../assets/images/navigation/portfolio.png`);
            return <Image source={img} />;
          },
          tabBarItemStyle: {
            backgroundColor: colors.white,
            borderTopEndRadius: 8,
          },
        }}
        component={NullString}
      />
      <Tab.Screen
        name="Deal"
        options={{
          tabBarButton: props => <TabBarAdvancedButton {...props} />,
        }}
        component={NullString}
      />
      <Tab.Screen
        name="Prices"
        options={{
          title: 'Prices',
          tabBarIcon: ({focused}) => {
            const img = focused
              ? require(`../../assets/images/navigation/prices-active.png`)
              : require(`../../assets/images/navigation/prices.png`);
            return <Image source={img} />;
          },
          tabBarItemStyle: {
            backgroundColor: colors.white,
            borderTopStartRadius: 8,
          },
        }}
        component={NullString}
      />
      <Tab.Screen
        name="Settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({focused}) => {
            const img = focused
              ? require(`../../assets/images/navigation/settings-active.png`)
              : require(`../../assets/images/navigation/settings.png`);
            return <Image source={img} />;
          },
          tabBarItemStyle: {
            backgroundColor: colors.white,
            borderTopEndRadius: 27,
          },
        }}
        component={NullString}
      />
    </Tab.Navigator>
  );
};
