import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";

interface ISearchInput {
  placeholder?: string;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
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

const SearchInput: React.FC<ISearchInput> = props => {
  const { placeholder, onPressEnter } = props;
  return <Search prefix={<SearchOutlined />} placeholder={placeholder || ""} onPressEnter={onPressEnter} allowClear />;
};

export default SearchInput;
