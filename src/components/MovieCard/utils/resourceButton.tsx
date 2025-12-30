import React from "react";

interface ResourceButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ResourceButton: React.FC<ResourceButtonProps> = ({
  label,
  onClick,
}) => {
  return (
    <button
      type="button"
      className="movie-card-resource-button"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
