import React, {useRef, useState} from 'react';
import {Animated, FlatList, Image, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {OnboardingItem, Paginator} from '../../components';
import {NextButton} from '../../components/NextButton';
import {Description} from '../../components/Typography';
import {slides} from '../../utilities';
import {styles} from './styles';

export const Onboarding: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef: any = useRef(null);

  //@ts-ignore
  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      console.log('welcome');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2F80ED', '#2360B1']}
        style={styles.linearGradient}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => console.log('welcome')}>
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
      <View style={styles.footer}>
        <Paginator data={slides} currentIndex={currentIndex} />
        <NextButton title="Next" onPress={scrollTo} style={styles.nextButton} />
      </View>
    </View>
  );
};
