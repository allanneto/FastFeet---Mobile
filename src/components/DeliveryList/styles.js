import styled from 'styled-components/native';

export const Container = styled.View``;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Option = styled.Text.attrs((props) => ({
  highlight: props.highlight,
}))`
  color: ${(props) => (props.highlight ? '#32036d' : '#999999')};
  text-decoration: ${(props) => (props.highlight ? 'underline' : 'none')};

  font-size: 14px;
  font-weight: bold;

  margin-right: 10px;
`;

export const Delivery = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-height: 355px;

  padding: 15px;
`;

export const HBar = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const DeliveryInfo = styled.Text`
  margin-left: 5px;
  font-size: 16px;
  color: #32036d;
  font-weight: bold;
`;

export const WrapStatus = styled.View`
  margin: 20px 30px 10px 30px;
  justify-content: center;
`;

export const StatusBar = styled.View`
  position: relative;
  flex: 1;
  max-height: 11px;

  height: 1px;
  border: 1px solid #32036d;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const WrapPoints = styled.View`
  position: absolute;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
`;

export const Point = styled.View.attrs((props) => ({
  fill: props.fill,
}))`
  height: 11px;
  width: 11px;

  border-radius: 5px;
  border: 1px solid #32036d;
  background: ${(props) => (props.fill ? '#32036d' : '#fff')};
`;

export const StatusBox = styled.View`
  padding: 0;
  max-height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const Status = styled.Text`
  font-size: 10px;
  color: #000;

  text-align: center;
  width: 70px;
`;

export const InfoBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

export const WrapInfo = styled.View`
  align-items: flex-start;
`;

export const Strong = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

export const Span = styled.Text`
  font-size: 14px;
  color: #666666;
`;

export const Warn = styled.Text`
  margin: 50px
  font-size: 16px;
  color: #32036d;
  font-weight: bold;
  text-align: center;
`;
