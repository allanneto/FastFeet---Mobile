import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 70px 20px 40px 20px;
`;

export const Camera = styled(RNCamera).attrs((props) => ({}))`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  border-radius: 5px;
`;

export const Button = styled.TouchableOpacity`
  margin-top: 10px;
  background: #32036d;
  height: 45px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

export const Text = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;
