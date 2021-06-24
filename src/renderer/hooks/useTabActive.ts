import { useState, useCallback } from "react";

/**
 * @description 切换选项卡钩子
 * @param currentKey
 * @param options
 * @returns
 */
export default function useTabActive(options: string[]) {
  const [activeKey, setActiveKey] = useState<string>(options[0]);

  const activeColor = useCallback(
    (currentKey: string) => {
      return activeKey === currentKey ? "#333" : "#9b9b9b";
    },
    [activeKey]
  );

  return { activeColor, activeKey, setActiveKey };
}
