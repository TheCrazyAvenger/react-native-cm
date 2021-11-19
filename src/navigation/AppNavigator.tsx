import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {getData} from '../store/actions';
import {AuthStack} from './AuthStack';
import {BottomTabs} from './BottomTabs';

export const AppNavigator: React.FC = () => {
  const token = useAppSelector(state => state.auth.token);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getData());
  }, []);

  const [showOnBoarding, setShowOnboarding] = useState(true);
  const [loading, setLoading] = useState(false);

  const checkOnboarding = async () => {
    setLoading(true);
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');
      // await AsyncStorage.removeItem('@viewedOnboarding');

      if (value !== null) {
        setShowOnboarding(false);
        return setLoading(false);
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

  return (
    <NavigationContainer>
      {loading ? (
        <ActivityIndicator />
      ) : token ? (
        <BottomTabs />
      ) : (
        <AuthStack showOnBoarding={showOnBoarding} />
      )}
    </NavigationContainer>
  );
};
