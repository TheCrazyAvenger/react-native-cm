import React, {useState} from 'react';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {colors, Screens} from '@constants';
import {NullString, Portfolio, Settings} from '@screens';
import {styles} from './styles';
import {Platform, View} from 'react-native';

import {TabBarAdvancedButton} from '../TabBarAdvancedButton';
import {
  HomeIcon,
  MenuModal,
  PortfolioIcon,
  PricesIcon,
  SettingsIcon,
} from '@components';
import {HomeStack} from '../HomeStack';
import {PricesStack} from '@navigation/PricesStack';

const Tab = createBottomTabNavigator();

export const BottomTabs: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <>
      <MenuModal visible={menuVisible} onPress={() => setMenuVisible(false)} />
      <Tab.Navigator
        tabBar={props => (
          <View style={styles.navigatorContainer}>
            <BottomTabBar {...props} />
            {Platform.OS === 'ios' && <View style={styles.xFillLine} />}
          </View>
        )}
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: styles.tabBarLabel,
        }}>
        <Tab.Screen
          name={Screens.homeStack}
          options={{
            title: 'Home',
            tabBarIcon: ({focused}) => (
              <HomeIcon color={focused ? colors.primary : colors.gray} />
            ),

            tabBarItemStyle: {
              backgroundColor: colors.white,
              borderTopStartRadius: 27,
            },
          }}
          component={HomeStack}
        />
        <Tab.Screen
          name={Screens.portfolio}
          options={{
            title: 'Portfolio',
            tabBarIcon: ({focused}) => (
              <PortfolioIcon color={focused ? colors.primary : colors.gray} />
            ),
            tabBarItemStyle: {
              backgroundColor: colors.white,
              borderTopEndRadius: 8,
            },
          }}
          component={Portfolio}
        />
        <Tab.Screen
          name="Deal"
          options={{
            tabBarButton: () => (
              <TabBarAdvancedButton onPress={() => setMenuVisible(true)} />
            ),
          }}
          component={NullString}
        />
        <Tab.Screen
          name={Screens.pricesStack}
          options={{
            title: 'Prices',
            tabBarIcon: ({focused}) => (
              <PricesIcon color={focused ? colors.primary : colors.gray} />
            ),
            tabBarItemStyle: {
              backgroundColor: colors.white,
              borderTopStartRadius: 8,
            },
          }}
          component={PricesStack}
        />
        <Tab.Screen
          name={Screens.settings}
          options={{
            title: 'Settings',
            tabBarIcon: ({focused}) => (
              <SettingsIcon color={focused ? colors.primary : colors.gray} />
            ),
            tabBarItemStyle: {
              backgroundColor: colors.white,
              borderTopEndRadius: 27,
            },
          }}
          component={Settings}
        />
      </Tab.Navigator>
    </>
  );
};
