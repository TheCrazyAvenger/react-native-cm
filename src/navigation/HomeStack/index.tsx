import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '../../constants';
import {
  ChooseBuy,
  ChooseSell,
  CompleteSellBuy,
  DetailsNews,
  Holdings,
  Home,
  News,
  PaymentMethodsSetUp,
  Profile,
  ReviewSellBuy,
  SellBuySetUp,
} from '@screens';
import {styles} from './styles';
import {BackButton} from '../BackButton';

const Stack = createNativeStackNavigator();

export const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Screens.home} component={Home} />
      <Stack.Screen name={Screens.holdings} component={Holdings} />
      <Stack.Group
        screenOptions={{
          headerLeft: () => <BackButton />,
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitleStyle,
          headerShadowVisible: false,
          title: 'Market News',
          headerShown: true,
        }}>
        <Stack.Screen name={Screens.news} component={News} />
        <Stack.Screen name={Screens.detailsNews} component={DetailsNews} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
