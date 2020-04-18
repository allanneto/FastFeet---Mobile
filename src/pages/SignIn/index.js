import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar, Alert } from 'react-native';
import Logo1 from '~/assets/logo2.png';

import * as S from './styles';

import { loginRequest, changeError } from '~/store/modules/auth/actions';

export default function SignIn({ navigation }) {
  const [id, setID] = useState('');

  const dispatch = useDispatch();

  const error = useSelector((state) => state.auth.error);

  const handleSubmit = async () => {
    dispatch(loginRequest(id));
  };

  const handleChange = (text) => {
    dispatch(changeError());
    setID(text);
  };

  useEffect(() => {
    handleChange('');
  }, []);

  return (
    <S.Container>
      <StatusBar backgroundColor="#e8c141" barStyle="dark-content" />

      <S.Form>
        <S.Logo source={Logo1} />

        <S.FormInput
          placeholder="Informe seu ID de cadastro"
          keyboardType="number-pad"
          autoCorrect={false}
          value={id}
          onChangeText={(text) => handleChange(text)}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          error={error}
        />

        <S.Button onPress={handleSubmit}>
          <S.Text>Entrar no sistema</S.Text>
        </S.Button>
      </S.Form>
    </S.Container>
  );
}
