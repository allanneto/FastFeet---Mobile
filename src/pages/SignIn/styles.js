/* eslint-disable prettier/prettier */
import styled, { css } from 'styled-components/native';
import { lighten, darken } from 'polished';
import { BaseButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`;
export const Form = styled.View`
  display: flex;
  align-items: center;

  background: #fff;
  border-radius: 5px;
  padding: 50px 25px;

  elevation: 8;
`;

export const Logo = styled.Image`
  width: 290px;
  height: 48px;

  margin-bottom: 40px;
`;

export const Button = styled(BaseButton).attrs({
  type: 'submit',
})`
  width: 325px;
  height: 48px;
  background: #320d6d;
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

export const FormInput = styled.TextInput.attrs((props) => ({
  error: props.error,
  length: props.length,
}))`
  width: 325px;
  height: 48px;
  border-radius: 5px;
  margin-bottom: 15px;
  background: ${lighten(0.15, '#ccc')};

  border: ${(props) => (props.error ? '1px solid #e32' : `1px solid ${darken(0.1, '#ccc')}`)};


  font-size: 16px;
  padding: 0 20px;
`;
