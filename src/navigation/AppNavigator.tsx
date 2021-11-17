import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {AuthStack} from './AuthStack';

export const AppNavigator: React.FC<{showOnBoarding: boolean}> = ({
  showOnBoarding,
}) => {
  return (
    <NavigationContainer>
      <AuthStack showOnBoarding={showOnBoarding} />
    </NavigationContainer>
  );
};
