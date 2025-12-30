import React from "react";
import { Empty } from "antd";
import "./EmptyState.scss";

interface EmptyStateProps {
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  description = "No items available",
}) => {
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={description}
      className="empty-state"
    />
  );
};
