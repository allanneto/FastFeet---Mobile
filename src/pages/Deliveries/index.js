import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, Alert } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import DeliveryList from '~/components/DeliveryList';

import { signOut } from '~/store/modules/auth/actions';

import api from '~/services/api';

import * as S from './styles';

export default function Deliveries({ navigation }) {
  const [user, setUser] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [highlight, setHighlight] = useState({
    pendente: true,
    entregue: false,
  });

  const id = useSelector((state) => state.auth.id);

  const dispatch = useDispatch();

  const loadCourier = async () => {
    const response = await api.get(`deliveryman/${id}`);

    const { courier } = response.data;

    return setUser(courier);
  };

  const loadDeliveries = async (filter) => {
    const defineStatus = (start_date, end_date, canceled_at) => {
      if (canceled_at !== null) {
        return 'CANCELADO';
      }
      if (end_date !== null) {
        return 'ENTREGUE';
      }

      if (start_date !== null && canceled_at === null) {
        return 'RETIRADO';
      }

      return 'PENDENTE';
    };

    const defineData = (delivery) => ({
      ...delivery,
      status: defineStatus(
        delivery.start_date,
        delivery.end_date,
        delivery.canceled_at,
      ),
    });

    try {
      if (filter) {
        const response = await api.get(`deliveryman/${id}/deliveries`, {
          params: {
            filter,
          },
        });

        if (response.data.message) {
          return Alert.alert('Você não possui entregas finalizadas.');
        }

        const data = response.data.map(defineData);

        return setDeliveries(data);
      }

      const response = await api.get(`deliveryman/${id}/deliveries`);

      if (response.data.message) {
        return Alert.alert('Você não possui entregas em progresso.');
      }

      const data = response.data.map((delivery) => ({
        ...delivery,
        status: defineStatus(
          delivery.start_date,
          delivery.end_date,
          delivery.canceled_at,
        ),
      }));

      return setDeliveries(data);
    } catch (error) {
      return Alert.alert('Deu erro hein...');
    }
  };

  useEffect(() => {
    loadDeliveries();

    if (user.length === 0) {
      loadCourier();
    }
  }, []);

  const handleHighlight = (option) => {
    switch (option) {
      case 'pendente':
        setHighlight({
          pendente: true,
          entregue: false,
        });
        break;
      case 'entregue':
        setHighlight({
          pendente: false,
          entregue: true,
        });
        break;
      default:
    }
  };

  const handlePress = (option, filter) => {
    handleHighlight(option);

    loadDeliveries(filter);
  };

  const handleNavigate = (deliveryId) => {
    navigation.navigate('Detail', { id: deliveryId });
  };

  const handleLogout = () => {
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
      <S.Header>
        {!user.avatar ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <S.Avatar
            source={{ uri: user.avatar.url.replace('localhost', '10.0.2.2') }}
          />
        )}
        <S.Profile>
          <S.Span>Bem vindo de volta,</S.Span>
          <S.Name>{user.name}</S.Name>
        </S.Profile>
        <Icon
          onPress={handleLogout}
          name="exit-to-app"
          size={40}
          color="#E74040"
        />
      </S.Header>

      <S.NavBar>
        <S.Title>Entregas</S.Title>
        <S.Filter>
          <S.Option
            highlight={highlight.pendente}
            onPress={() => handlePress('pendente')}
          >
            Pendentes
          </S.Option>

          <S.Option
            highlight={highlight.entregue}
            onPress={() => handlePress('entregue', 'finish')}
          >
            Entregues
          </S.Option>
        </S.Filter>
      </S.NavBar>

      <S.Content>
        <DeliveryList
          navigate={(deliveryId) => handleNavigate(deliveryId)}
          deliveries={deliveries}
        />
      </S.Content>
    </S.Container>
  );
}
