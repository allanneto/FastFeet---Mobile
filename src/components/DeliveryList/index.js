import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as S from './styles';
import FormatDate from '~/util/formatDate';

export default function DeliveryList({ deliveries, navigate }) {
  const verifyStatus = (status) => {
    switch (status) {
      case 'ENTREGUE':
        return (
          <S.WrapStatus>
            <S.StatusBar />
            <S.WrapPoints>
              <S.Point fill />
              <S.Point fill />
              <S.Point fill />
            </S.WrapPoints>
          </S.WrapStatus>
        );
      case 'RETIRADO':
        return (
          <S.WrapStatus>
            <S.StatusBar />
            <S.WrapPoints>
              <S.Point fill />
              <S.Point fill />
              <S.Point />
            </S.WrapPoints>
          </S.WrapStatus>
        );
      case 'CANCELADO':
        return (
          <S.WrapStatus>
            <S.StatusBar />
            <S.WrapPoints>
              <S.Point fill />
              <S.Point />
              <S.Point />
            </S.WrapPoints>
          </S.WrapStatus>
        );
      default:
        return (
          <S.WrapStatus>
            <S.StatusBar />
            <S.WrapPoints>
              <S.Point fill />
              <S.Point />
              <S.Point />
            </S.WrapPoints>
          </S.WrapStatus>
        );
    }
  };

  return (
    <>
      {deliveries.length !== 0 ? (
        <S.List
          data={deliveries}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <S.Delivery>
              <S.HBar>
                <Icon name="local-shipping" color="#32036d" size={30} />
                <S.DeliveryInfo>
                  Encomenda
                  {` ${item.id}`}
                </S.DeliveryInfo>
              </S.HBar>
              {verifyStatus(item.status)}
              <S.StatusBox>
                <S.Status>Aguardando Retirada</S.Status>
                <S.Status>Retirada</S.Status>
                <S.Status>Entregue</S.Status>
              </S.StatusBox>
              <S.InfoBox>
                <S.WrapInfo>
                  <S.Span>Data</S.Span>
                  <S.Strong>{FormatDate(item.createdAt)}</S.Strong>
                </S.WrapInfo>
                <S.WrapInfo>
                  <S.Span>Cidade</S.Span>
                  <S.Strong>{item.recipient.city}</S.Strong>
                </S.WrapInfo>
                <S.Option onPress={() => navigate(item.id)} highlight>
                  Ver Detalhes
                </S.Option>
              </S.InfoBox>
            </S.Delivery>
          )}
        />
      ) : (
        <>
          <S.Warn>SEM ENTREGA(S) REGISTRADA(S).</S.Warn>
        </>
      )}
    </>
  );
}
