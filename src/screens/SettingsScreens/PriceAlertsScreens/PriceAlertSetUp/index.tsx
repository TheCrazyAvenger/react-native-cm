import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {StatusBar, View} from 'react-native';
import {Wrapper} from '../../../../components';
import {Subtitle, SubtitleMedium} from '../../../../components/Typography';
import {colors} from '../../../../constants';
import {PriceAlertsSetUpForm} from '../../../../forms';
import {Screen} from '../../../../ui';
import {metals} from '../../../../utilities';
import {styles} from './styles';

export const PriceAlertSetUp: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const {id, type, prevValues} = route.params;

  const metalType = metals[type ? prevValues.id - 1 : id - 1];

  const {Image, metal, color, backgroundColor, price} = metalType;

  return (
    <Screen>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{...styles.image, backgroundColor: backgroundColor}}>
              <Image />
            </View>
            <Subtitle style={{...styles.title, color: color}}>{metal}</Subtitle>
          </View>

          <View>
            <SubtitleMedium style={{...styles.title, color: colors.black}}>
              {price}
            </SubtitleMedium>
          </View>
        </View>
        <Wrapper
          style={{
            backgroundColor: colors.primary,
            marginTop: 10,
            marginBottom: 16,
          }}
        />
        <PriceAlertsSetUpForm
          metal={metal}
          color={color}
          backgroundColor={backgroundColor}
        />
      </View>
    </Screen>
  );
};
