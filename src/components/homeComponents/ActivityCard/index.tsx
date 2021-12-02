import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ViewMoreButton, Wrapper} from '../..';
import {colors} from '@constants';
import {useAppSelector} from '@hooks';
import {getColor, getOperationImage} from '@utilities';
import {Description, SubtitleMedium, TitleMedium} from '@Typography';
import {styles} from './styles';

export const ActivityCard: React.FC = () => {
  const operations = useAppSelector(state => state.operations.operations);

  const isData =
    operations.buy.length > 0 ||
    operations.sell.length > 0 ||
    operations.fund.length > 0 ||
    operations.withdraw.length > 0 ||
    operations.redeem.length > 0
      ? true
      : false;

  let operationsLength = 0;
  [...Object.values(operations)].map((operation: any) => {
    operation.map((operation: any) => {
      if (operation !== null) return operationsLength++;
    });
  });

  return (
    <View style={styles.container}>
      <TitleMedium style={{marginBottom: 20}}>Recent Activity</TitleMedium>
      {isData ? (
        [...Object.values(operations)].map((operation: any) => {
          return operation.map((item: any, index: number) => {
            const {type, date, usd, image, oz, id}: any = item;
            const Image = getOperationImage(image);

            return (
              <React.Fragment key={index}>
                <TouchableOpacity activeOpacity={0.7} style={styles.cardItem}>
                  <View style={styles.cardItem}>
                    <Image />
                    <View>
                      <SubtitleMedium style={styles.type}>
                        {type}
                      </SubtitleMedium>
                      <Description>{date}</Description>
                    </View>
                  </View>
                  <View style={{alignItems: 'flex-end'}}>
                    <SubtitleMedium
                      style={{...styles.type, color: getColor(usd)}}>
                      {usd}
                    </SubtitleMedium>
                    <Description>{oz ? `${oz} oz` : null}</Description>
                  </View>
                </TouchableOpacity>
                {id === operationsLength ? null : (
                  <Wrapper style={{backgroundColor: colors.primary}} />
                )}
              </React.Fragment>
            );
          });
        })
      ) : (
        <SubtitleMedium>Empty</SubtitleMedium>
      )}
      {isData ? <ViewMoreButton onPress={() => console.log(1)} /> : null}
    </View>
  );
};
