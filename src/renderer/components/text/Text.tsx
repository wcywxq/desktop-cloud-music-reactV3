// import React from "react";
import styled, { css } from "styled-components";

type Cursor = "pointer" | "auto";
interface IText {
  size?: number;
  ellipsis?: boolean;
  color?: string;
  active?: string;
  strong?: boolean;
  cursor?: Cursor;
}

const strongStyle = css`
  font-weight: bold;
`;

const ellipsisStyle = css`
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const Text = styled.span`
  display: inline-block;
  transition: all 0.3s ease-in-out;
  color: ${({ color }: IText) => color || "#333"};
  font-size: ${({ size }: IText) => (size && size > 14 ? `${size}px` : "14px")};
  transform: scale(${({ size }: IText) => (size && size <= 14 ? size / 14 : 1)});
  cursor: ${({ cursor }: IText) => cursor || "pointer"};
  ${({ strong }: IText) => strong && strongStyle};
  ${({ ellipsis }: IText) => ellipsis && ellipsisStyle};
  &:hover {
    color: ${({ active }: IText) => active || "#ff4d4f"};
  }
`;

export default Text;
