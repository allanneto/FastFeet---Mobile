import React, { useState } from 'react';
import { Alert } from 'react-native';

import * as S from './styles';
import api from '~/services/api';

export default function RegisterProblem({ navigation, route }) {
  const [problem, setProblem] = useState('');
  const [error, setError] = useState(false);

  const { id } = route.params;

  const handleChange = (text) => {
    setError(false);
    setProblem(text);
  };

  const handleRegister = async () => {
    if (problem.length === 0) {
      setError(true);
      return Alert.alert('Por favor informar o problema antes de enviar.');
    }

    try {
      const response = await api.post(`problems/${id}`, {
        description: problem,
      });
      navigation.goBack();
      return Alert.alert('Problema registrado com sucesso.');
    } catch (err) {
      return Alert.alert('Mano... mais um erro');
    }
  };

  return (
    <S.Container>
      <S.Content error={error}>
        <S.Input
          placeholder="Inclua aqui o problema que ocorreu na entrega"
          maxLength={255}
          onChangeText={(text) => handleChange(text)}
        />
      </S.Content>
      <S.ConfirmButton onPress={handleRegister}>
        <S.Info>Enviar</S.Info>
      </S.ConfirmButton>
    </S.Container>
  );
}
