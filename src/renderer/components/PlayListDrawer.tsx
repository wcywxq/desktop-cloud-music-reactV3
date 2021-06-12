import React, { useMemo } from "react";
import styled from "styled-components";

type IProps = {
  width?: number | string;
  visible: boolean;
  onClose?: () => void;
};

const PlayListDrawerContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  width: ${(props: { width: number | string }) => (typeof props.width === "string" ? props.width : `${props.width}px`)};
  height: 100%;
  overflow: auto;
  background-color: #fff;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
  transition: width .5s ease-in-out;
`;

const PlayListDrawer: React.FC<IProps> = props => {
  const { visible, width, children } = props;

  const currentWidth = useMemo(() => {
    if (!visible) return 0;
    return width || "30%";
  }, [visible, width]);

  return <PlayListDrawerContainer width={currentWidth}>{children}</PlayListDrawerContainer>;
};

export default PlayListDrawer;
