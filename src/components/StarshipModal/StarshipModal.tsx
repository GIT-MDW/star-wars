import React from "react";
import type { Starship } from "../../types";
import { ResourceModal } from "../ResourceModal/ResourceModal";
import {
  ResourceDetailsList,
  type ResourceDetailsItem,
} from "../ResourceDetails/ResourceDetailsList";

interface StarshipModalProps {
  starship: Starship | null;
  loading: boolean;
  open: boolean;
  onClose: () => void;
}

const createStarshipItems = (starship: Starship): ResourceDetailsItem[] => [
  { label: "Name", value: starship.name },
  { label: "Model", value: starship.model },
  { label: "Manufacturer", value: starship.manufacturer },
  { label: "Cost", value: `${starship.cost_in_credits} credits` },
  { label: "Length", value: starship.length },
  { label: "Crew", value: starship.crew },
  { label: "Passengers", value: starship.passengers },
  { label: "Class", value: starship.starship_class },
];

export const StarshipModal: React.FC<StarshipModalProps> = ({
  starship,
  loading,
  open,
  onClose,
}) => {
  if (!open) return null;

  return (
    <ResourceModal
      title={starship?.name || "Starship"}
      open={open}
      onClose={onClose}
      loading={loading}
      loadingText="Loading starship details..."
    >
      {starship && (
        <ResourceDetailsList items={createStarshipItems(starship)} />
      )}
    </ResourceModal>
  );
};
