// import React from "react";
import styled, { css } from "styled-components";

type PackTextProps = {
  size?: number;
  ellipsis?: boolean;
  color?: string;
  active?: string;
  strong?: boolean;
  cursor?: "pointer" | "auto";
};

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
  color: ${({ color }: PackTextProps) => color || "#333"};
  font-size: ${({ size }: PackTextProps) => (size && size > 14 ? `${size}px` : "14px")};
  transform: scale(${({ size }: PackTextProps) => (size && size <= 14 ? size / 14 : 1)});
  cursor: ${({ cursor }: PackTextProps) => cursor || "pointer"};
  ${({ strong }: PackTextProps) => strong && strongStyle};
  ${({ ellipsis }: PackTextProps) => ellipsis && ellipsisStyle};
  &:hover {
    color: ${({ active }: PackTextProps) => active || "#ff4d4f"};
  }
`;

export default Text;
