import React from "react";
import styled from "styled-components";
import {
  FullscreenOutlined,
  LeftOutlined,
  RedoOutlined,
  RightOutlined,
  SettingOutlined,
  SkinOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { SearchInput } from "@/components/input";

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

const HeaderControl: React.FC = () => (
  <HeaderControlContainer>
    <LeftOutlined />
    <RightOutlined />
    <RedoOutlined />
    <SearchInput />
    <SkinOutlined />
    <Link to="/setting">
      <SettingOutlined />
    </Link>
    <FullscreenOutlined />
  </HeaderControlContainer>
);

export default HeaderControl;
