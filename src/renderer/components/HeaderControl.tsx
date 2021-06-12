import React from "react";
import styled from "styled-components";
import { FullscreenOutlined, LeftOutlined, RedoOutlined, RightOutlined, SearchOutlined, SettingOutlined, SkinOutlined } from "@ant-design/icons";
import { Input } from "antd";

const HeaderControlContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 20px;

  svg {
    font-size: 16px;
    cursor: pointer;
    color: #9b9b9b;
  }
`;

const SearchControl = styled(Input)`
  border-radius: 20px;
  background-color: #f5f5f5;
  border: none;
  box-shadow: none;

  .ant-input {
    background-color: #f5f5f5;
  }

  &:hover,
  &:focus {
    border: none;
    box-shadow: none;
  }
`;

const HeaderControl: React.FC = () => {
  return (
    <HeaderControlContainer>
      <LeftOutlined />
      <RightOutlined />
      <RedoOutlined />
      <SearchControl prefix={<SearchOutlined />} />
      <SkinOutlined />
      <SettingOutlined />
      <FullscreenOutlined />
    </HeaderControlContainer>
  );
};

export default HeaderControl;
