import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StatusBar, Alert, ActivityIndicator } from 'react-native';

import * as S from './styles';
import { signOut } from '~/store/modules/auth/actions';

import api from '~/services/api';
import FormatDate from '~/util/formatDate';

export default function Profile() {
  const [user, setUser] = useState([]);

  const dispatch = useDispatch();

  const id = useSelector((state) => state.auth.id);
  const loadUser = async () => {
    const response = await api.get(`deliveryman/${id}`);

    setUser(response.data.courier);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleLogout = () => {
    console.log(user);

    Alert.alert('LOGOUT', 'Deseja fazer logout?', [
      { text: 'Não', onPress: () => console.log('Nao saindo') },
      {
        text: 'Sim',
        onPress: () => dispatch(signOut()),
      },
    ]);
  };

  return (
    <S.Container>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {!user.avatar ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <S.Avatar
          source={{ uri: user.avatar.url.replace('localhost', '10.0.2.2') }}
        />
      )}
      <S.BoxInfo>
        <S.Span>Nome Completo</S.Span>
        <S.Strong>{user.name}</S.Strong>
        <S.Span>E-mail</S.Span>
        <S.Strong>{user.email}</S.Strong>
        <S.Span>Data de cadastro</S.Span>
        <S.Strong>{FormatDate(user.createdAt)}</S.Strong>
      </S.BoxInfo>
      <S.Button>
        <S.Logout onPress={() => handleLogout()}>Logout</S.Logout>
      </S.Button>
    </S.Container>
  );
}
