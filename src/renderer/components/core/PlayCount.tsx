import React from 'react';
import styled from 'styled-components';
import { IconFont } from '@/components/core';

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

	const transformUnit = (val: number) => {
		if (!val) { return 0; }
		let length = val.toString().length;
		if (length > 4 && length < 9) {
			return `${(val / 10000).toFixed(2)}w`;
		}
		if (length > 8) {
			return `${(val / 1000000000).toFixed(2)}亿`;
		}
		return val;
	};

	return (
    <Container>
      <Icon type="icon-play" />
      <Quantity>{transformUnit(value)}</Quantity>
    </Container>
	);
};

export default PlayCount;
