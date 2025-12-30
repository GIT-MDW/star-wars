import React from "react";
import { Descriptions } from "antd";

export interface ResourceDetailsItem {
  label: string;
  value: string | number | React.ReactNode;
}

interface ResourceDetailsListProps {
  items: ResourceDetailsItem[];
  column?: number;
  size?: "default" | "middle" | "small";
  bordered?: boolean;
}

export const ResourceDetailsList: React.FC<ResourceDetailsListProps> = ({
  items,
  column = 1,
  size = "small",
  bordered = true,
}) => {
  return (
    <Descriptions column={column} size={size} bordered={bordered}>
      {items.map((item, index) => (
        <Descriptions.Item key={`${item.label}-${index}`} label={item.label}>
          {item.value}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
};
