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

  const isData = operations.length > 0 ? true : false;

  return (
    <View style={styles.container}>
      <TitleMedium style={{marginBottom: 20}}>Recent Activity</TitleMedium>
      {isData ? (
        operations
          .slice(-5)
          .reverse()
          .map((operation: any, i: number) => {
            const {type, date, usd, image, oz, id}: any = operation;
            const Image = getOperationImage(image);

            return (
              <React.Fragment key={id}>
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
                {i === 4 ? null : (
                  <Wrapper style={{backgroundColor: colors.primary}} />
                )}
              </React.Fragment>
            );
          })
      ) : (
        <SubtitleMedium>Empty</SubtitleMedium>
      )}
      {isData ? <ViewMoreButton onPress={() => console.log(1)} /> : null}
    </View>
  );
};
