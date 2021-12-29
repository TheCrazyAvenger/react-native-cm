import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '@constants';
import {
  AutoBuy,
  ChooseProduct,
  AutoBuySetup,
  ReviewAutoBuy,
  CompleteAutoBuy,
} from '@screens';
import {BackButton} from '../BackButton';
import {styles} from './styles';

const Stack = createNativeStackNavigator();

export const AutoBuyStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <BackButton />,
        headerTitleAlign: 'center',
        headerTitleStyle: styles.headerTitleStyle,
        headerShadowVisible: false,
        headerShown: false,
      }}>
      <Stack.Screen name={Screens.autoBuy} component={AutoBuy} />
      <Stack.Screen name={Screens.chooseProduct} component={ChooseProduct} />
      <Stack.Screen name={Screens.autoBuySetUp} component={AutoBuySetup} />
      <Stack.Screen name={Screens.reviewAutoBuy} component={ReviewAutoBuy} />
      <Stack.Screen
        name={Screens.completeAutoBuy}
        component={CompleteAutoBuy}
      />
    </Stack.Navigator>
  );
};
