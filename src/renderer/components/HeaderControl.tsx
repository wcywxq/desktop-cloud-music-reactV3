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
import type { RouteConfigComponentProps } from "react-router-config";
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

const HeaderControl: React.FC<RouteConfigComponentProps> = props => {
  const { history } = props;

  const onSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    history.push(`/search/single?keywords=${(event.target as any).value}`);
  };

  return (
    <HeaderControlContainer>
      <LeftOutlined />
      <RightOutlined />
      <RedoOutlined />
      <div style={{ flex: 1 }}>
        <SearchInput width={350} onPressEnter={onSearch} />
      </div>
      <SkinOutlined />
      <Link to="/setting">
        <SettingOutlined />
      </Link>
      <FullscreenOutlined />
    </HeaderControlContainer>
  );
};

export default HeaderControl;
