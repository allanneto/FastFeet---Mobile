/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StatusBar, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as S from './styles';
import api from '~/services/api';
import FormatCep from '~/util/cepMask';
import FormatDate from '~/util/formatDate';

export default function DeliveryDetail({ route, navigation }) {
  const [delivery, setDelivery] = useState({});

  const { id } = route.params;

  const courier_id = useSelector((state) => state.auth.id);

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
      const response = await api.get(`deliveryman/${courier_id}/deliveries`, {
        params: {
          id,
        },
      });

      const data = defineData(response.data);

      console.log(data);
      setDelivery(data);
    } catch (error) {
      console.log('mano deu erro dnv....');
    }
  };

  useEffect(() => {
    loadDelivery();
  }, []);

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
            <S.H3>DESTINATÁRIO</S.H3>
            <S.Info>FENEXZ BURRO</S.Info>
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
                    id,
                  });
                }}
              >
                <Icon name="highlight-off" size={30} color="#E74040" />
                <S.Span>Informar Problema</S.Span>
              </S.Touch>
              <S.Touch
                onPress={() => {
                  navigation.navigate('ShowProblems', {
                    id,
                  });
                }}
              >
                <Icon name="info-outline" size={30} color="#E7BA40" />
                <S.Span>Visualizar Problemas</S.Span>
              </S.Touch>
              <S.Touch
                onPress={() => {
                  navigation.navigate('ConfirmDelivery', {
                    id,
                  });
                }}
              >
                <Icon name="alarm-on" size={30} color="#32036d" />
                <S.Span>Confirmar Entrega</S.Span>
              </S.Touch>
            </S.Actions>
          </S.DeliveryBox>
        )}
      </S.Content>
    </S.Container>
  );
}
