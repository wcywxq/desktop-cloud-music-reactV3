// import React from "react";
import styled, { css } from "styled-components";

type PackTextProps = {
  size?: number;
  ellipsis?: boolean;
  color?: string;
  active?: string;
  strong?: boolean;
};

const Text = styled.span`
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: ${(props: PackTextProps) => props.color || "#333"};
  font-size: ${(props: PackTextProps) => (props.size && props.size > 14 ? `${props.size}px` : "14px")};
  transform: scale(${(props: PackTextProps) => (props.size && props.size <= 14 ? props.size / 14 : 1)});
  ${(props: PackTextProps) =>
    props.strong &&
    css`
      font-weight: bold;
    `}
  ${(props: PackTextProps) =>
    props.ellipsis &&
    css`
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    `}
  &:hover {
    color: ${(props: PackTextProps) => props.active || "#ff4d4f"};
  }
`;

export default Text;
