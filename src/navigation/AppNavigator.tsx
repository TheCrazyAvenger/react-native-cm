import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {getData} from '../store/actions';
import {AuthStack} from './AuthStack';
import {MainNavigator} from './MainNavigator';
import {setLoading} from '../store/slices/authSlice';
import {LoadingItem} from '../components';
import {getOperations} from '../store/actions/operations';
import {getAutoBuy} from '../store/actions/autoBuy';
import {getPriceAlerts} from '../store/actions/priceAlerts';
import {useGetFullNewsMutation} from '@api';
import {addNews} from '@store/slices/newsSlice';
import {getPaymentMethod} from '@store/actions/paymentMethod';

export const AppNavigator: React.FC = () => {
  const token = useAppSelector(state => state.auth.token);
  const loading = useAppSelector(state => state.auth.loading);

  const [getFullNews] = useGetFullNewsMutation();

  const dispatch = useAppDispatch();

  const [showOnBoarding, setShowOnboarding] = useState(true);

  const checkOnboarding = async () => {
    dispatch(setLoading(true));
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');
      // await AsyncStorage.removeItem('@viewedOnboarding');
      await dispatch(getData());

      //@ts-ignore
      const news = await getFullNews();

      await dispatch(getOperations());
      await dispatch(getAutoBuy());
      await dispatch(getPriceAlerts());
      await dispatch(getPaymentMethod());

      await dispatch(addNews(Object.values(news)[0]));
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
