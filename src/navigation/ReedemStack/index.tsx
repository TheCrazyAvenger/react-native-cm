import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '@constants';
import {
  Cart,
  Catalog,
  CompleteReedem,
  PaymentMethodsSetUp,
  Profile,
  ReviewReedem,
} from '@screens';
import {styles} from './styles';
import {BackButton} from '../BackButton';
import {TouchableOpacity, View} from 'react-native';
import {Cart as CartImage} from '@assets/images/reedem';
import {useNavigation} from '@react-navigation/core';
import {useAppSelector} from '@hooks';
import {Illustration} from '@Typography';

const Stack = createNativeStackNavigator();

export const ReedemStack: React.FC = () => {
  const navigation: any = useNavigation();
  const cart = useAppSelector(state => state.reedem.cart);

  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <BackButton />,
        headerTitleAlign: 'center',
        headerTitleStyle: styles.headerTitleStyle,
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name={Screens.catalog}
        options={{
          title: 'Reedem',
          headerRight: () => {
            return (
              <TouchableOpacity
                style={styles.cart}
                onPress={() => navigation.navigate(Screens.cart)}>
                {cart.length > 0 && (
                  <View style={styles.cartLength}>
                    <Illustration style={styles.cartText}>
                      {cart.length}
                    </Illustration>
                  </View>
                )}
                <CartImage />
              </TouchableOpacity>
            );
          },
        }}
        component={Catalog}
      />
      <Stack.Screen
        name={Screens.cart}
        options={{title: 'Cart'}}
        component={Cart}
      />
      <Stack.Screen
        name={Screens.paymentMethodsSetUp}
        options={{title: 'Add New Payment Method'}}
        component={PaymentMethodsSetUp}
      />
      <Stack.Screen
        name={Screens.profile}
        options={{title: 'Profile'}}
        component={Profile}
      />
      <Stack.Screen
        name={Screens.reviewReedem}
        options={{title: 'Redeeming Confirmation'}}
        component={ReviewReedem}
      />
      <Stack.Screen
        name={Screens.completeReedem}
        options={{title: 'Redeeming Confirmation'}}
        component={CompleteReedem}
      />
    </Stack.Navigator>
  );
};
