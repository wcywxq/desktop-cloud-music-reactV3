import React from "react";
import { Text } from "@/components/text";

/**
 * @description 命中关键词钩子
 * @returns
 */
export default function useHitKeywords() {
  /**
   * @description 命中项渲染
   * @param str
   * @param keywords
   * @returns
   */
  const renderHitKeywords = (str: string, keywords: string): JSX.Element => {
    let arr = str.split(keywords);
    let len = arr.length;
    if (!len) return <React.Fragment>{str}</React.Fragment>;
    return (
      <React.Fragment>
        {arr.map((item, index) => (
          <React.Fragment key={index}>
            {item}
            {index !== len - 1 && (
              <Text key={index} color="#5a7bab" active="#5a7bab">
                {keywords}
              </Text>
            )}
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  };
  return { renderHitKeywords };
}
