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

export const AppNavigator: React.FC = () => {
  const token = useAppSelector(state => state.auth.token);

  const dispatch = useAppDispatch();

  const [showOnBoarding, setShowOnboarding] = useState(true);
  const [loading, setLoading] = useState(true);

  const checkOnboarding = async () => {
    setLoading(true);
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');
      // await AsyncStorage.removeItem('@viewedOnboarding');
      await dispatch(getData());

      await dispatch(getOperations());
      await dispatch(getAutoBuy());
      await dispatch(getPriceAlerts());
      await dispatch(getPaymentMethod());

      if (value !== null) {
        setShowOnboarding(false);
        return setLoading(false);
      }

      setShowOnboarding(true);

      return setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

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
