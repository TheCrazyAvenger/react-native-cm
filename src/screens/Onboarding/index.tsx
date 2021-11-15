import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import React, {useRef, useState} from 'react';
import {Animated, FlatList, Image, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {OnboardingItem, PaginationFooter, Paginator} from '../../components';

import {Description} from '../../components/Typography';
import {TextButton} from '../../ui';
import {slides} from '../../utilities';
import {styles} from './styles';

export const Onboarding: React.FC = () => {
  const navigation: any = useNavigation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef: any = useRef(null);

  //@ts-ignore
  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const scrollTo = async () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      try {
        await AsyncStorage.setItem('@viewedOnboarding', 'true');
        navigation.navigate('welcome');
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2F80ED', '#2360B1']}
        style={styles.linearGradient}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.navigate('welcome')}>
          <Description style={styles.skipText}>Skip</Description>
        </TouchableOpacity>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logo.png')}
        />
        <View style={{flex: 3}}>
          <FlatList
            data={slides}
            renderItem={({item}) => <OnboardingItem item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            bouncesZoom={false}
            keyExtractor={item => item.id}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slidesRef}
          />
        </View>
      </LinearGradient>
      <PaginationFooter
        data={slides}
        currentIndex={currentIndex}
        onPress={scrollTo}
        title="Next"
      />
    </View>
  );
};
