import {useNavigation} from '@react-navigation/core';
import React, {useMemo, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {NewsCardProps, NumberPagination, ViewMoreButton, Wrapper} from '../..';
import {colors, Screens} from '@constants';
import {Description, SubtitleMedium, TitleMedium} from '@Typography';
import {styles} from './styles';
import {getTime, removeTags} from '@utilities';
import {LoadingItem} from '@components';

export const NewsCard: React.FC<NewsCardProps> = ({data, isLoading, style}) => {
  const navigation: any = useNavigation();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const currentNewsData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize, data]);

  return (
    <View>
      <View
        style={{
          ...styles.container,
          ...style,
        }}>
        <View style={{...styles.cardItem, marginBottom: 15}}>
          <TitleMedium>Market News</TitleMedium>
          {data.length !== 0 && data.length <= 4 && (
            <ViewMoreButton
              style={{marginTop: 0}}
              onPress={() => navigation.navigate(Screens.news)}
            />
          )}
        </View>
        <View>
          {!isLoading ? (
            currentNewsData.map((item: any, i: number) => {
              const {id, title, body, url, created_at, user_update} = item;

              const {monthName, day, year} = getTime(created_at);

              return (
                <View key={id}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      navigation.push(Screens.detailsNews, {
                        id,
                        body,
                        title,
                        url,
                        date: created_at,
                      })
                    }>
                    <SubtitleMedium numberOfLines={2} style={{marginBottom: 8}}>
                      {title}
                    </SubtitleMedium>
                    <SubtitleMedium numberOfLines={2} style={styles.type}>
                      {removeTags(body)}
                    </SubtitleMedium>
                    <Description>
                      {`${user_update} · ${monthName} ${day}, ${year}`}
                    </Description>
                  </TouchableOpacity>
                  {i !== currentNewsData.length - 1 && (
                    <Wrapper style={{backgroundColor: colors.primary}} />
                  )}
                </View>
              );
            })
          ) : (
            <LoadingItem />
          )}
        </View>
      </View>

      {data.length !== 0 && data.length > 4 && (
        <NumberPagination
          style={{marginBottom: 100}}
          currentPage={currentPage}
          showView={false}
          totalCount={data.length}
          pageSize={pageSize}
          onPageChange={page => setCurrentPage(page)}
          changeView={(view: number) => setPageSize(view)}
        />
      )}
    </View>
  );
};
