import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {getData} from '../store/actions';
import {AuthStack} from './AuthStack';
import {MainNavigator} from './MainNavigator';
import {LoadingItem} from '../components';
import {getOperations} from '../store/actions/operations';
import {getAutoBuy} from '../store/actions/autoBuy';
import {getPriceAlerts} from '../store/actions/priceAlerts';
import {getPaymentMethod} from '@store/actions/paymentMethod';
import SplashScreen from 'react-native-splash-screen';

export const AppNavigator: React.FC = () => {
  const token = useAppSelector(state => state.auth.token);

  const dispatch = useAppDispatch();

  const [showOnBoarding, setShowOnboarding] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkOnboarding = async () => {
    setLoading(true);
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');
      // await AsyncStorage.removeItem('@viewedOnboarding');
      const token = await AsyncStorage.getItem('token');

      if (value === null) {
        setShowOnboarding(true);
        await setLoading(false);
        return SplashScreen.hide();
      } else {
        await setShowOnboarding(false);
      }
      if (token) {
        await dispatch(getData());

        await dispatch(getOperations());
        await dispatch(getAutoBuy());
        await dispatch(getPriceAlerts());
        await dispatch(getPaymentMethod());
      }

      await setLoading(false);
      return SplashScreen.hide();
    } catch (e) {
      SplashScreen.hide();
      setLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  useEffect(() => {
    token && setShowOnboarding(false);
  }, [token]);

  return (
    <NavigationContainer>
      {token && !loading ? (
        <MainNavigator />
      ) : loading ? (
        <LoadingItem />
      ) : (
        <AuthStack showOnBoarding={showOnBoarding} />
      )}
    </NavigationContainer>
  );
};
