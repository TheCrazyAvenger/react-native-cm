import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '../../constants';
import {BottomTabs} from '../BottomTabs';
import {Notifications, Password, Profile, Refer} from '../../screens';
import {styles} from './styles';
import {BackButton} from '../BackButton';
import {AutoBuyStack} from '../AutoBuyStack';
import {PriceAlertsStack} from '../PriceAlertsStack';
import {VerificationStack} from '../VerificationStack';
import {PaymentMethodsStack} from '../PaymentMethodsStack';

const Stack = createNativeStackNavigator();

export const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'bottomTabs'}
        options={{
          headerShown: false,
        }}
        component={BottomTabs}
      />
      <Stack.Group
        screenOptions={{
          headerLeft: () => <BackButton />,
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitleStyle,
          headerShadowVisible: false,
        }}>
        <Stack.Screen
          name={Screens.refer}
          options={{
            title: 'Refer a Friend',
          }}
          component={Refer}
        />
        <Stack.Screen
          name={Screens.autoBuyStack}
          options={{title: 'Auto Buy'}}
          component={AutoBuyStack}
        />
        <Stack.Screen
          name={Screens.priceAlertsStack}
          options={{title: 'Spot Price Alerts'}}
          component={PriceAlertsStack}
        />
        <Stack.Screen
          name={Screens.notifications}
          options={{title: 'Notifications'}}
          component={Notifications}
        />
        <Stack.Screen
          name={Screens.profile}
          options={{title: 'Profile'}}
          component={Profile}
        />
        <Stack.Screen
          name={Screens.verificationStack}
          options={{title: 'Verification'}}
          component={VerificationStack}
        />
        <Stack.Screen
          name={Screens.password}
          options={{title: 'Change Your Password'}}
          component={Password}
        />
        <Stack.Screen
          name={Screens.paymentMethodsStack}
          options={{title: 'Payment Methods'}}
          component={PaymentMethodsStack}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
