import styled from 'styled-components/native';
import { BaseButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  background: #fff;
  padding: 40px;
`;

export const Avatar = styled.Image`
  height: 140px;
  width: 140px;
  align-self: center;

  border-radius: 70px;
`;

export const BoxInfo = styled.View`
  margin-top: 40px;

  max-height: 300px;
`;

export const Span = styled.Text`
  font-size: 14px;
  color: #666666;
`;

export const Strong = styled.Text`
  font-size: 20px;
  color: #444444;

  font-weight: bold;
  margin-bottom: 15px;
`;

export const Button = styled(BaseButton)`
  margin-top: 15px;
  height: 40px;
  background: #e74040;

  align-items: center;
  justify-content: center;
`;

export const Logout = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;
