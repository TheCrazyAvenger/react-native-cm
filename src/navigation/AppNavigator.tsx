import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {AuthStack} from './AuthStack';
import {BottomTabs} from './BottomTabs';

export const AppNavigator: React.FC<{showOnBoarding: boolean}> = ({
  showOnBoarding,
}) => {
  return (
    <NavigationContainer>
      <BottomTabs />
      {/* <AuthStack showOnBoarding={showOnBoarding} /> */}
    </NavigationContainer>
  );
};
