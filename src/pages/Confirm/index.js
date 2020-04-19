import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';

import * as S from './styles';
import api from '~/services/api';

export default function Confirm({ route, navigation }) {
  const [uri, setUri] = useState('');

  const id = useSelector((state) => state.auth.id);
  const { recipient_name: name, id: delivery_id } = route.params;

  const cameraRef = useRef(null);

  const handleSubmit = async () => {
    try {
      const dataFile = new FormData();

      dataFile.append('file', {
        type: 'image/jpg',
        uri,
        name: 'assignature.jpg',
      });

      console.log(dataFile);
      await api.post('deliveryman/2/deliveries', dataFile);

      console.log('mano euy cheguei aqui');
      return Alert.alert('Entrega finalizada com sucesso!');
    } catch (error) {
      console.log('ah vá que deu erro dnv');
      console.log(error);
    }
  };

  const handleCapture = async () => {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);

      setUri(data.uri);

      try {
        const dataFile = new FormData();

        dataFile.append('file', {
          type: 'image/jpg',
          uri,
          name: 'assignature.jpg',
        });

        console.log(dataFile);
        await api.post('deliveryman/2/deliveries', dataFile);

        console.log('mano euy cheguei aqui');
        return Alert.alert('Entrega finalizada com sucesso!');
      } catch (error) {
        console.log('ah vá que deu erro dnv');
        console.log(error);
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
