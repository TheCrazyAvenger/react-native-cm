import React from 'react';
import {Formik} from 'formik';
import {ScrollView, View} from 'react-native';
import {FormImagePicker, ItemPicker} from '../../../components';
import {documentsVerificationSchema} from '../..';
import {styles} from './styles';
import {useNavigation, useRoute} from '@react-navigation/core';
import {TextButton} from '../../../ui';
import {colors, Screens} from '../../../constants';
import {SubtitleMedium, Error} from '../../../components/Typography';

export const DocumentsVerificationForm: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const {values: prevValues} = route.params;

  const saveChanges = async (values: {[key: string]: any}) => {
    navigation.navigate(Screens.verificationComplete, {
      values: {...values, ...prevValues},
    });
  };

  return (
    <Formik
      validationSchema={documentsVerificationSchema}
      initialValues={{
        documentsType: '',
        documents: [],
      }}
      onSubmit={values => saveChanges(values)}>
      {({handleSubmit, values, errors, touched, setFieldValue}) => {
        return (
          <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <ItemPicker
                label="Documents Type"
                items={[
                  {label: 'Driver’s License', value: 'Driver’s License'},
                  {label: 'Passport', value: 'Passport'},
                  {label: 'ID card', value: 'ID card'},
                ]}
                value={values.documentsType}
                onChange={value => setFieldValue('documentsType', value)}
                errorMessage={errors.documentsType}
                errorStyle={{left: 0}}
                isTouched={touched.documentsType}
                labelStyle={styles.labelStyle}
                style={{marginHorizontal: 0}}
              />

              <View style={{marginBottom: 20}}>
                <SubtitleMedium>
                  Please, upload a valid, unexpired, government-issued copy of
                  your photo ID. File size should not exceed 5 MBs. Please note
                  that PDF and JPG are the only allowed file types.
                </SubtitleMedium>
              </View>
              <View>
                <View
                  style={{
                    ...styles.imagePicker,
                    borderColor:
                      errors.documents && touched.documents
                        ? colors.red
                        : colors.primary,
                  }}>
                  <FormImagePicker name="documents" />
                </View>
                {errors.documents && touched.documents ? (
                  <Error style={styles.error}>{errors.documents}</Error>
                ) : (
                  <View style={{marginBottom: 50}} />
                )}
              </View>
            </ScrollView>

            <TextButton
              title="Continue"
              solid
              style={{marginBottom: 25}}
              onPress={handleSubmit}
            />
          </View>
        );
      }}
    </Formik>
  );
};
