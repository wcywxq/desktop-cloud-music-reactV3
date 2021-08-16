import React from "react";
import { Text } from "@/components/text";

const SubTitle: React.FC<{ data: string[] }> = ({ data }) => {
  if (!Array.isArray(data) || !data.length) return null;
  return (
    <Text color="#9b9b9b" active="#9b9b9b">
      ({data.join(" / ")})
    </Text>
  );
};

export default SubTitle;
