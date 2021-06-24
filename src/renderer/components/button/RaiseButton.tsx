import { Button } from 'antd';
import styled from 'styled-components';

interface IRaiseButton {
  color: string;
  background: string;
  activebackground?: string;
};

const RaiseButton = styled(Button)`
  border-radius: 20px;
  background: ${(props: IRaiseButton) => props.background || 'transparent'};
  color: ${(props: IRaiseButton) => props.color};
  border: 1px solid transparent;

  &:hover, &:focus {
    background: ${(props: IRaiseButton) => props.activebackground || props.background || 'transparent'};
    color: ${(props: IRaiseButton) => props.color};
    border-color: transparent;
  }
`;

export default RaiseButton;
