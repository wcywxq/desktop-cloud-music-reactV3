import React from "react";
import { Space } from "antd";
import { Text } from "@/components/text";

interface IProps {
  icon: React.FC;
  text?: string | number;
}

const IconText = ({ icon, text }: IProps) => (
  <Text color="#9b9b9b">
    <Space size="small">
      {React.createElement(icon)}
      {text}
    </Space>
  </Text>
);

export default IconText;
