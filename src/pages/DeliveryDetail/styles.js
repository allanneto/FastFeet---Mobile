import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #e8c141;
`;
export const Content = styled.View`
  background: #fff;

  flex: 1;
  margin: 70px 20px 30px 20px;
  border-radius: 5px;
  elevation: 10;
`;

export const DeliveryBox = styled.View`
  padding: 0px 15px;
`;

export const H2 = styled.Text`
  margin-left: 5px;
  font-size: 15px;
  color: #32036d;
  font-weight: bold;
`;

export const H3 = styled.Text`
  font-size: 16px;
  color: #999999;
`;

export const Info = styled.Text`
  color: #666666;
  font-size: 16px;
  margin-bottom: 15px;
`;

export const HBox = styled.View`
  margin: 10px 0;
  flex-direction: row;
  align-items: center;
`;

export const VBox = styled.View.attrs((props) => ({
  lastchild: props.lastchild,
}))`
  margin-left: ${(props) => (props.lastchild ? '50px' : '0')};
`;

export const Actions = styled.View`
  flex-direction: row;
`;

export const Touch = styled.TouchableOpacity`
  margin: 15px 15px;
  max-width: 80px;
  align-items: center;
`;

export const Span = styled.Text`
  font-size: 15px;
  color: #999999;
  text-align: center;
`;

export const Start = styled.TouchableOpacity`
  height: 30px;
  background: #32036d;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  font-size: 15px;
  color: #fff;
  text-align: center;
  font-weight: bold;
`;
