/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StatusBar, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useRoute, useNavigation } from '@react-navigation/native';

import * as S from './styles';
import api from '~/services/api';
import FormatCep from '~/util/cepMask';
import FormatDate from '~/util/formatDate';

export default function DeliveryDetail() {
  const [delivery, setDelivery] = useState({});

  const route = useRoute();
  const navigation = useNavigation();

  const { id: delivery_id } = route.params;

  const id = useSelector((state) => state.auth.id);

  const loadDelivery = async () => {
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
        delivery.canceled_at
      ),
    });

    try {
      const response = await api.get(`deliveryman/${id}/deliveries`, {
        params: {
          id: delivery_id,
        },
      });

      const data = defineData(response.data);

      setDelivery(data);
    } catch (error) {
      console.log('mano deu erro dnv....');
    }
  };

  useEffect(() => {
    loadDelivery();
  }, []);

  const handleStart = async () => {
    if (delivery.status === 'ENTREGUE') {
      return Alert.alert('Essa entrega ja foi finalizada');
    }

    if (delivery.status === 'RETIRADO') {
      return Alert.alert('Essa entrega ja foi iniciada');
    }

    try {
      // eslint-disable-next-line prettier/prettier
      const response = await api.get(
        `deliveryman/${id}/deliveries/${delivery_id}`,
      );
      if (response.message) {
        return Alert.alert(
          'Erro ao registrar a entrega e lembre-se que só pode pegar 5 entregar por dia.',
        );
      }

      loadDelivery();

      return Alert.alert('Entrega iniciada com sucesso');
    } catch (error) {
      return Alert.alert(
        'Erro ao registrar a entrega e lembre-se que só pode pegar 5 entregar por dia.',
      );
    }
  };

  return (
    <S.Container>
      <StatusBar backgroundColor="#e8c141" />
      <S.Content>
        {!delivery.recipient ? (
          <ActivityIndicator />
        ) : (
          <S.DeliveryBox>
            <S.HBox>
              <Icon name="local-shipping" size={25} color="#32036d" />
              <S.H2>Informações da entrega</S.H2>
            </S.HBox>
            <S.H3>DESTINATÁRIO</S.H3>
            <S.Info>{delivery.recipient.recipient_name}</S.Info>
            <S.H3>ENDEREÇO DE ENTREGA</S.H3>
            <S.Info>
              {`${delivery.recipient.street}, ${delivery.recipient.number}, ${
                delivery.recipient.city
              } - ${FormatCep(delivery.recipient.postal_code)}`}
            </S.Info>
            <S.H3>PRODUTO</S.H3>
            <S.Info>{delivery.product}</S.Info>
            <S.HBox>
              <Icon name="event" size={25} color="#32036d" />
              <S.H2>Situação da entrega</S.H2>
            </S.HBox>
            <S.H3>STATUS</S.H3>
            <S.Info>{delivery.status}</S.Info>
            <S.HBox>
              <S.VBox>
                <S.H3>DATA DE RETIRADA</S.H3>
                <S.Info>{FormatDate(delivery.start_date)}</S.Info>
              </S.VBox>
              <S.VBox lastchild>
                <S.H3>DATA DE ENTREGA</S.H3>
                <S.Info>{FormatDate(delivery.end_date)}</S.Info>
              </S.VBox>
            </S.HBox>

            <S.Actions>
              <S.Touch
                onPress={() => {
                  navigation.navigate('RegisterProblem', {
                    id: delivery_id,
                  });
                }}
              >
                <Icon name="highlight-off" size={30} color="#E74040" />
                <S.Span>Informar Problema</S.Span>
              </S.Touch>
              <S.Touch
                onPress={() => {
                  navigation.navigate('ShowProblems', {
                    id: delivery_id,
                  });
                }}
              >
                <Icon name="info-outline" size={30} color="#E7BA40" />
                <S.Span>Visualizar Problemas</S.Span>
              </S.Touch>
              <S.Touch
                onPress={() => {
                  navigation.navigate('ConfirmDelivery', {
                    id: delivery.id,
                    recipient_name: delivery.recipient.recipient_name,
                  });
                }}
              >
                <Icon name="alarm-on" size={30} color="#32036d" />
                <S.Span>Confirmar Entrega</S.Span>
              </S.Touch>
            </S.Actions>
            <S.Start onPress={handleStart}>
              <S.Text>Iniciar Entrega</S.Text>
            </S.Start>
          </S.DeliveryBox>
        )}
      </S.Content>
    </S.Container>
  );
}
