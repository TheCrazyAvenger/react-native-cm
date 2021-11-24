import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '../../constants';
import {
  DocumentsVerification,
  Verification,
  VerificationComplete,
} from '../../screens';

import {useAppSelector} from '../../hooks/hooks';

const Stack = createNativeStackNavigator();

export const VerificationStack: React.FC = () => {
  const verified = useAppSelector(state => state.auth.verified);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={
        verified ? Screens.verificationComplete : Screens.verification
      }>
      <Stack.Screen name={Screens.verification} component={Verification} />
      <Stack.Screen
        name={Screens.documentsVerification}
        component={DocumentsVerification}
      />
      <Stack.Screen
        name={Screens.verificationComplete}
        component={VerificationComplete}
      />
    </Stack.Navigator>
  );
};
