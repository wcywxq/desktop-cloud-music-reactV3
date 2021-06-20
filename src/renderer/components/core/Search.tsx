import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";

type SearchProps = {
  placeholder?: string;
};

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

const Search: React.FC<SearchProps> = props => {
  const { placeholder } = props;
  return <SearchControl prefix={<SearchOutlined />} placeholder={placeholder || ""} />;
};

export default Search;
