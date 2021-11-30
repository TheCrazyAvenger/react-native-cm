import React, {useRef, useState} from 'react';
import {Animated, FlatList, View} from 'react-native';
import {metals} from '../../../utilities';

import {PricesItem} from '../PricesItem';
import {PricesPaginator} from '../PricesPaginator';

export const PricesGraph: React.FC<{id: number}> = ({id}) => {
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
      <FlatList
        data={metals}
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
      <PricesPaginator data={metals} currentIndex={currentIndex} />
    </View>
  );
};
