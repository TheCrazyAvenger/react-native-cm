import React, {useRef, useState} from 'react';
import {Animated, FlatList, View} from 'react-native';
import {metals} from '@utilities';
import {PricesItem} from '../PricesItem';
import {PricesPaginator} from '../PricesPaginator';
import {styles} from './styles';
import {LoadingItem} from '@components';
import {Subtitle} from '@Typography';

export const PricesGraph: React.FC<{
  id: number;
  data: any;
  isLoading: boolean;
}> = ({id, data, isLoading}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef: any = useRef(null);

  //@ts-ignore
  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  return (
    <View>
      {data ? (
        <View>
          <FlatList
            data={data}
            renderItem={({item}) => <PricesItem data={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            bouncesZoom={false}
            keyExtractor={item => item.id.toString()}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {
                useNativeDriver: false,
              },
            )}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slidesRef}
          />
          <PricesPaginator data={data} currentIndex={currentIndex} />
        </View>
      ) : isLoading ? (
        <View style={styles.container}>
          <LoadingItem />
        </View>
      ) : (
        <View style={styles.container}>
          <Subtitle>No data</Subtitle>
        </View>
      )}
    </View>
  );
};
