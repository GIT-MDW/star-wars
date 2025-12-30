import React from "react";
import { ResourceButton } from "./resourceButton";
import { EmptyState } from "../../EmptyState/EmptyState";

interface ResourceListProps {
  items: string[];
  itemLabel: (index: number) => string;
  onItemClick: (url: string, e: React.MouseEvent<HTMLButtonElement>) => void;
  emptyMessage: string;
}

export const ResourceList: React.FC<ResourceListProps> = ({
  items,
  itemLabel,
  onItemClick,
  emptyMessage,
}) => {
  if (items.length === 0) {
    return <EmptyState description={emptyMessage} />;
  }

  return (
    <div className="movie-card-resource-list">
      {items.map((url, index) => (
        <ResourceButton
          key={url}
          label={itemLabel(index)}
          onClick={(e) => onItemClick(url, e)}
        />
      ))}
    </div>
  );
};
