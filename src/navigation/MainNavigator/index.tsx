import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '../../constants';
import {BottomTabs} from '../BottomTabs';
import {
  CookiePolicy,
  Notifications,
  Password,
  Profile,
  Refer,
  StorageFees,
  Transactions,
} from '../../screens';
import {styles} from './styles';
import {BackButton} from '../BackButton';
import {AutoBuyStack} from '../AutoBuyStack';
import {PriceAlertsStack} from '../PriceAlertsStack';
import {VerificationStack} from '../VerificationStack';
import {PaymentMethodsStack} from '../PaymentMethodsStack';
import {BuyStack} from '../BuyStack';

const Stack = createNativeStackNavigator();

export const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screens.bottomTabs}
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
        <Stack.Screen
          name={Screens.cookiePolicy}
          options={{title: 'Cookie Policy'}}
          component={CookiePolicy}
        />
        <Stack.Screen
          name={Screens.transactions}
          options={{title: 'Transactions'}}
          component={Transactions}
        />
        <Stack.Screen
          name={Screens.storageFees}
          options={{title: 'Storage Fees'}}
          component={StorageFees}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          headerLeft: () => <BackButton />,
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitleStyle,
          headerShadowVisible: false,
        }}>
        <Stack.Screen
          name={Screens.buyStack}
          options={{title: 'Buy'}}
          component={BuyStack}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
