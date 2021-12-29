import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '@constants';
import {ChoosePriceAlert, PriceAlerts, PriceAlertSetUp} from '@screens';
import {BackButton} from '../BackButton';
import {styles} from './styles';

const Stack = createNativeStackNavigator();

export const PriceAlertsStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <BackButton />,
        headerTitleAlign: 'center',
        headerTitleStyle: styles.headerTitleStyle,
        headerShadowVisible: false,
        headerShown: false,
      }}>
      <Stack.Screen name={Screens.priceAlerts} component={PriceAlerts} />
      <Stack.Screen
        name={Screens.choosePriceAlert}
        component={ChoosePriceAlert}
      />
      <Stack.Screen
        name={Screens.priceAlertSetUp}
        component={PriceAlertSetUp}
      />
    </Stack.Navigator>
  );
};
