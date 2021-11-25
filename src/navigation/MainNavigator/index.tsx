import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '../../constants';
import {BottomTabs} from '../BottomTabs';
import {
  ChangePassword,
  Notifications,
  Profile,
  Refer,
  Verification,
} from '../../screens';
import {styles} from './styles';
import {BackButton} from '../BackButton';
import {AutoBuyStack} from '../AutoBuyStack';
import {PriceAlertsStack} from '../PriceAlertsStack';
import {VerificationStack} from '../VerificationStack';

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
          name={Screens.changePassword}
          options={{title: 'Change Your Password'}}
          component={ChangePassword}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
