import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 70px 20px 80px 20px;
`;

export const Content = styled.View.attrs((props) => ({
  error: props.error,
}))`
  border: ${(props) => (props.error ? '3px solid #e32' : 'none')};
  background: #fff;
  align-items: flex-start;
  border-radius: 5px;

  elevation: 10;
`;

export const Input = styled.TextInput.attrs({
  numberOfLines: 20,
  multiline: true,
  textAlignVertical: 'top',
})`
  font-size: 18px;
  padding: 5px;
  margin: 15px;
`;

export const ConfirmButton = styled.TouchableOpacity`
  margin-top: 30px;
  height: 45px;
  border-radius: 5px;
  background: #32036d;
  align-items: center;
  justify-content: center;
`;

export const Info = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;
