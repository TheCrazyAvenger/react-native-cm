import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '@constants';
import {ChoosePriceAlert, PriceAlertsEmpty, PriceAlertSetUp} from '@screens';
import {BackButton} from '../BackButton';
import {styles} from './styles';
import {PriceAlertsTabs} from '@navigation/PriceAlertsTabs';
import {useAppSelector} from '@hooks';

const Stack = createNativeStackNavigator();

export const PriceAlertsStack: React.FC = () => {
  const priceAlerts = useAppSelector(state => state.priceAlerts.priceAlerts);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (
      priceAlerts.Gold.length === 0 &&
      priceAlerts.Silver.length === 0 &&
      priceAlerts.Platinum.length === 0 &&
      priceAlerts.Palladium.length === 0
    ) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [priceAlerts]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <BackButton />,
        headerTitleAlign: 'center',
        headerTitleStyle: styles.headerTitleStyle,
        headerShadowVisible: false,
        headerShown: false,
      }}
      initialRouteName={
        isEmpty ? Screens.priceAlerts : Screens.priceAlertsTabs
      }>
      <Stack.Screen name={Screens.priceAlerts} component={PriceAlertsEmpty} />
      <Stack.Screen
        name={Screens.priceAlertsTabs}
        component={PriceAlertsTabs}
      />
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
