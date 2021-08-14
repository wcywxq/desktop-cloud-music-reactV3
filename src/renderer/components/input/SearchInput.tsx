import React from "react";
import { Input } from "antd";
import styled from "styled-components";
import { IconFont } from "../icon";
import { SearchOutlined } from "@ant-design/icons";

interface ISearchInput {
  placeholder?: string;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  width?: number;
}

const Search = styled(Input)`
  border-radius: 20px;
  background-color: #f5f5f5;
  box-shadow: none;
  border: none;

  .ant-input {
    background-color: #f5f5f5;
  }

  &:hover,
  &:focus {
    box-shadow: none;
    border: none;
  }
`;

const SearchInput: React.FC<ISearchInput> = ({ placeholder, onPressEnter, width }) => {
  return <Search style={{ width: `${width}px` }} prefix={<SearchOutlined />} placeholder={placeholder || ""} onPressEnter={onPressEnter} allowClear />;
};

export default SearchInput;
