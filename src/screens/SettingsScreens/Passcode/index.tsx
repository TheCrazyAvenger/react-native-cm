import {LoadingItem, Notification} from '@components';
import {colors} from '@constants';
import {TitleMedium} from '@Typography';
import {Screen} from '@ui';
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {PasscodeForm} from '../../../forms';
import {styles} from './styles';

export const Passcode: React.FC = () => {
  const [passcode, setPasscode] = useState('');
  const [goToConfirm, setGoToConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passcodeModal, setPasscodeModal] = useState(true);
  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    passcode.length === 4 && setGoToConfirm(true);
  }, [passcode]);

  if (loading) {
    return <LoadingItem />;
  }

  return (
    <>
      <Notification
        text="To enable, you must first create a 4-digit CyberMetals passcode."
        visible={passcodeModal}
        textStyle={{color: colors.white}}
        buttonColor="white"
        style={{top: 0, backgroundColor: '#BDBDBD', borderColor: '#BDBDBD'}}
        onPress={() => setPasscodeModal(false)}
      />
      <Notification
        text="Passcodes do not match. Please try again."
        visible={errorModal}
        textStyle={{color: colors.white}}
        buttonColor="white"
        style={{top: 0, backgroundColor: '#EB5757', borderColor: '#EB5757'}}
        onPress={() => setErrorModal(false)}
      />
      <Screen type="View">
        <StatusBar barStyle="dark-content" backgroundColor={'transparent'} />
        <TitleMedium style={styles.title}>
          {goToConfirm ? 'Confirm passcode' : 'Create a unique passcode'}
        </TitleMedium>

        <PasscodeForm
          setError={value => setErrorModal(value)}
          setLoading={value => setLoading(value)}
          onChange={value => setPasscode(value)}
          setNotify={setPasscodeModal}
          notify={passcodeModal}
          error={errorModal}
        />
      </Screen>
    </>
  );
};
