import React, { useEffect, useState } from 'react';

import * as S from './styles';
import api from '~/services/api';
import FormatDate from '~/util/formatDate';

export default function ShowProblems({ route, navigation }) {
  const [problems, setProblems] = useState([]);
  const { id } = route.params;

  useEffect(() => {
    const loadProblems = async () => {
      try {
        const response = await api.get('problems', {
          params: {
            delivery: id,
          },
        });
        return setProblems(response.data);
      } catch (err) {}
    };

    loadProblems();
  }, []);

  return (
    <S.Container>
      <S.Title>
        Encomenda
        {` 0${id}`}
      </S.Title>
      <S.Content>
        <S.List
          data={problems}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <S.Problem>
              <S.HBar>
                <S.Description>{item.description}</S.Description>
                <S.Info>{FormatDate(item.createdAt)}</S.Info>
              </S.HBar>
            </S.Problem>
          )}
        />
      </S.Content>
    </S.Container>
  );
}
