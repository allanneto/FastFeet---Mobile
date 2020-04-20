import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';

import { useRoute, useNavigation } from '@react-navigation/native';

import * as S from './styles';
import api from '~/services/api';

export default function Confirm() {
  const [uri, setUri] = useState('');

  const route = useRoute();
  const navigation = useNavigation();

  const courier_id = useSelector((state) => state.auth.id);

  const { recipient_name: name, id } = route.params;

  const cameraRef = useRef(null);

  const handleSubmit = async () => {};

  const handleCapture = async () => {
    console.log(id);

    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);

      setUri(data.uri);

      try {
        // eslint-disable-next-line no-undef
        const dataFile = new FormData();

        dataFile.append('file', {
          type: 'image/jpg',
          uri: data.uri,
          name: 'assignature.jpg',
        });
        await api.post(`deliveryman/${courier_id}/deliveries/${id}`, dataFile);

        navigation.navigate('Tab');
        return Alert.alert('Entrega finalizada com sucesso!');
      } catch (error) {
        console.log(error);
        return Alert.alert('Deu erro, mas deu certo!');
      }
    }
  };

  return (
    <S.Container>
      <S.Camera
        ref={cameraRef}
        type={RNCamera.Constants.Type.back}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        captureAudio={false}
      />
      <S.Button onPress={() => handleCapture()}>
        <S.Text>Enviar</S.Text>
      </S.Button>
    </S.Container>
  );
}
