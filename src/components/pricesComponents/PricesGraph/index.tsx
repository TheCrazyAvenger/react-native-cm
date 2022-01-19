import React, {useCallback, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import {PricesItem} from '../PricesItem';
import {PricesPaginator} from '../PricesPaginator';
import {styles} from './styles';
import {EmptyDataScreen, LoadingItem, PricesGraphProps} from '@components';

export const PricesGraph: React.FC<PricesGraphProps> = ({data, isLoading}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef: any = useRef(null);

  const renderItem = useCallback(({item}) => <PricesItem data={item} />, []);
  const keyExtractor = useCallback(item => item.id.toString(), []);

  //@ts-ignore
  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  return data ? (
    <View>
      <FlatList
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        removeClippedSubviews
        data={data}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        bouncesZoom={false}
        keyExtractor={keyExtractor}
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
      <EmptyDataScreen style={{marginTop: 160}} title="No data" />
    </View>
  );
};
