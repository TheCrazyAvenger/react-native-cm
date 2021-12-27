import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '@constants';
import {
  DocumentsVerification,
  Verification,
  VerificationComplete,
  VerificationInfo,
} from '@screens';

const Stack = createNativeStackNavigator();

export const VerificationStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={Screens.verificationInfo}
        component={VerificationInfo}
      />
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
