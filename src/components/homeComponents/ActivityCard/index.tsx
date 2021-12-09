import React, {useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {ViewMoreButton, Wrapper} from '../..';
import {colors, Screens} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import {getColor, getOperationImage, numberWithCommas} from '@utilities';
import {Description, SubtitleMedium, TitleMedium} from '@Typography';
import {styles} from './styles';
import {getOperations} from '@store/actions/operations';
import {LoadingItem} from '@components';
import {useNavigation} from '@react-navigation/core';

export const ActivityCard: React.FC = () => {
  const operations = useAppSelector(state => state.operations.operations);

  const navigation: any = useNavigation();

  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const checkOperations = async () => {
    setLoading(true);
    await dispatch(getOperations());
    setLoading(false);
  };

  useEffect(() => {
    checkOperations();
  }, []);

  return (
    <View style={styles.container}>
      <TitleMedium style={{marginBottom: 20}}>Recent Activity</TitleMedium>
      {loading ? (
        <LoadingItem />
      ) : operations.length > 0 ? (
        operations
          .filter((item: any) => item.type)
          .sort(
            (item: any, next: any) =>
              new Date(`${item.date}, ${item.time}`) <
              new Date(`${next.date}, ${next.time}`),
          )
          .slice(0, 5)
          .map((operation: any, i: number) => {
            const {title, date, usd, total, image, oz, id}: any = operation;
            const Image = getOperationImage(image);

            return (
              <React.Fragment key={id}>
                <View style={styles.cardContainer}>
                  <View style={styles.cardItem}>
                    <Image />
                    <View>
                      <SubtitleMedium numberOfLines={1} style={styles.type}>
                        {title}
                      </SubtitleMedium>
                      <Description>{date}</Description>
                    </View>
                  </View>
                  <View style={{alignItems: 'flex-end'}}>
                    <SubtitleMedium
                      style={{...styles.type, color: getColor(usd)}}>
                      {`${
                        usd.split(' ')[0] === '-' ? '-' : '+'
                      } $${numberWithCommas(Number(total).toFixed(2))}`}
                    </SubtitleMedium>
                    <Description>{oz ? `${oz} oz` : null}</Description>
                  </View>
                </View>
                {i === 4 ? null : (
                  <Wrapper style={{backgroundColor: colors.primary}} />
                )}
              </React.Fragment>
            );
          })
      ) : (
        <SubtitleMedium>Empty</SubtitleMedium>
      )}
      {!loading && operations.length > 0 ? (
        <ViewMoreButton
          onPress={() => navigation.navigate(Screens.transactions)}
        />
      ) : null}
    </View>
  );
};
