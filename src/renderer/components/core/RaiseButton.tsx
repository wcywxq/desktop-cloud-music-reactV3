import { Button } from 'antd';
import styled from 'styled-components';

type RaiseButtonType = {
  color: string;
  background: string;
  activebackground?: string;
};

const RaiseButton = styled(Button)`
  border-radius: 20px;
  background: ${(props: RaiseButtonType) => props.background || 'transparent'};
  color: ${(props: RaiseButtonType) => props.color};
  border: 1px solid transparent;

  &:hover, &:focus {
    background: ${(props: RaiseButtonType) => props.activebackground || props.background || 'transparent'};
    color: ${(props: RaiseButtonType) => props.color};
    border-color: transparent;
  }
`;

export default RaiseButton;
