import React from 'react';
import styled from 'styled-components';
import { IconFont } from '@/components/icon';
import { transformUnit } from "@/utils";

const Container = styled.span`
  position: absolute;
  left: 10px;
  bottom: 5px;
  display: flex;
  align-items: center;
  padding: 0 5px;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 10px;
  color: #fff;
`;

const Icon = styled(IconFont)`
  transform: scale(0.9);
`;

const Quantity = styled.span`
  transform: scale(0.9);
`;

const PlayCount: React.FC<{ value: number }> = (props) => {
	const { value } = props;

	return (
    <Container>
      <Icon type="icon-play_white" />
      <Quantity>{transformUnit(value)}</Quantity>
    </Container>
	);
};

export default PlayCount;
