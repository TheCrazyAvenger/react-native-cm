import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, StatusBar, View} from 'react-native';
import {Wrapper} from '../../../../components';
import {
  Description,
  SubtitleMedium,
  TitleMedium,
} from '../../../../components/Typography';
import {colors, Screens} from '../../../../constants';
import {Screen, TextButton} from '../../../../ui';
import {styles} from './styles';

export const CompleteAutoBuy: React.FC = () => {
  const navigation: any = useNavigation();

  const route: any = useRoute();

  const {type, metal, amount, endDate, frequency, paymentMethod, startDate} =
    route.params;

  return (
    <Screen>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.container}>
        {type ? (
          <TitleMedium style={styles.title}>
            Auto Buy Update Complete!
          </TitleMedium>
        ) : (
          <TitleMedium style={styles.title}>
            Auto Buy Setup Complete!{' '}
            <Image
              source={require('../../../../assets/images/settings/complete.png')}
            />
          </TitleMedium>
        )}

        <View style={styles.reviewItem}>
          <View style={{marginRight: 36, marginBottom: 20}}>
            <Description style={{color: colors.gray, marginBottom: 4}}>
              Buying
            </Description>
            <SubtitleMedium style={{fontFamily: 'OpenSans-SemiBold'}}>
              {metal}
            </SubtitleMedium>
          </View>
          <View style={{marginRight: 36}}>
            <Description style={{color: colors.gray, marginBottom: 4}}>
              Amount
            </Description>
            <SubtitleMedium style={{fontFamily: 'OpenSans-SemiBold'}}>
              $ {amount}
            </SubtitleMedium>
          </View>
          <View>
            <Description style={{color: colors.gray, marginBottom: 4}}>
              Payment Method
            </Description>
            <SubtitleMedium style={{fontFamily: 'OpenSans-SemiBold'}}>
              {paymentMethod}: $54.80
            </SubtitleMedium>
          </View>
        </View>

        <Wrapper
          style={{backgroundColor: colors.primary, marginVertical: 20}}
        />

        <View style={styles.reviewItem}>
          <View style={{marginRight: 36, marginBottom: 20}}>
            <Description style={{color: colors.gray, marginBottom: 4}}>
              Start Date
            </Description>
            <SubtitleMedium style={{fontFamily: 'OpenSans-SemiBold'}}>
              {startDate}
            </SubtitleMedium>
          </View>
          {endDate && (
            <View style={{marginRight: 36}}>
              <Description style={{color: colors.gray, marginBottom: 4}}>
                End Date
              </Description>
              <SubtitleMedium style={{fontFamily: 'OpenSans-SemiBold'}}>
                {endDate}
              </SubtitleMedium>
            </View>
          )}
          <View>
            <Description style={{color: colors.gray, marginBottom: 4}}>
              Frequency
            </Description>
            <SubtitleMedium style={{fontFamily: 'OpenSans-SemiBold'}}>
              {frequency}
            </SubtitleMedium>
          </View>
        </View>

        <View style={{marginBottom: 24}}>
          <SubtitleMedium style={{color: colors.gray}}>
            The price provided is an estimate only. The actual price charged
            will be based on CyberMetals’ spot price and premium for each
            product at the time the order is executed. All transactions will be
            executed between 5:00 p.m. EST and 6:00 p.m. EST on the day your
            Auto Buy is scheduled.
          </SubtitleMedium>
        </View>

        <View>
          {type ? (
            <TextButton
              solid
              title="Got it"
              onPress={() => navigation.pop(3)}
            />
          ) : (
            <>
              <TextButton
                solid
                style={{marginBottom: 20}}
                title="Set up another Auto Buy"
                onPress={() => navigation.pop(3)}
              />
              <TextButton
                title="Go to Dashboard"
                style={{marginBottom: 5}}
                onPress={() => navigation.pop(4)}
              />
            </>
          )}
        </View>
      </View>
    </Screen>
  );
};
