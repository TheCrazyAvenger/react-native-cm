import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {getData} from '../store/actions';
import {AuthStack} from './AuthStack';
import LottieView from 'lottie-react-native';
import {MainNavigator} from './MainNavigator';
import {setLoading} from '../store/slices/authSlice';
import {LoadingItem} from '../components';
import {getNews} from '../store/actions/news';
import {getOperations} from '../store/actions/operations';
import {getAutoBuy} from '../store/actions/autoBuy';
import {getPriceAlerts} from '../store/actions/priceAlerts';

export const AppNavigator: React.FC = () => {
  const token = useAppSelector(state => state.auth.token);
  const loading = useAppSelector(state => state.auth.loading);

  const dispatch = useAppDispatch();

  const [showOnBoarding, setShowOnboarding] = useState(true);

  const checkOnboarding = async () => {
    dispatch(setLoading(true));
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');
      // await AsyncStorage.removeItem('@viewedOnboarding');
      await dispatch(getData());
      await dispatch(getNews());
      await dispatch(getOperations());
      await dispatch(getAutoBuy());
      await dispatch(getPriceAlerts());
      if (value !== null) {
        setShowOnboarding(false);
        return dispatch(setLoading(false));
      }

      setShowOnboarding(true);

      return dispatch(setLoading(false));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  return (
    <NavigationContainer>
      {token ? (
        <MainNavigator />
      ) : loading ? (
        <LoadingItem />
      ) : (
        <AuthStack showOnBoarding={showOnBoarding} />
      )}
    </NavigationContainer>
  );
};
