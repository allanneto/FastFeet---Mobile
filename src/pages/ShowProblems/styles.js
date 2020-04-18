import styled from 'styled-components/native';
import { darken } from 'polished';

export const Container = styled.SafeAreaView`
  margin: 60px 20px 60px 20px;
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 20px;
  text-align: center;
  color: #32036d;
  font-weight: bold;
`;

export const Content = styled.View`
  margin-top: 15px;
  background: #fff;
  border-radius: 5px;
  elevation: 10;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Problem = styled.View`
  margin: 10px;
  flex: 1;
  border-radius: 5px;
  padding: 0 5px;
  elevation: 3;
`;

export const HBar = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5px;
`;

export const Description = styled.Text.attrs({
  multiline: true,
  numberOfLines: 4,
})`
  flex: 1;
`;

export const Info = styled.Text`
  color: ${darken(0.2, '#999999')};
`;
