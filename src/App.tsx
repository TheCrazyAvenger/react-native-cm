import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {AppNavigator} from './navigation/AppNavigator';

export const App: React.FC = () => {
  const [showOnBoarding, setShowOnboarding] = useState(true);
  const [loading, setLoading] = useState(false);

  const checkOnboarding = async () => {
    setLoading(true);
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');
      // await AsyncStorage.removeItem('@viewedOnboarding');

      if (value !== null) {
        setLoading(false);
        return setShowOnboarding(false);
      }

      setShowOnboarding(true);

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <AppNavigator showOnBoarding={showOnBoarding} />
      )}
    </SafeAreaProvider>
  );
};
