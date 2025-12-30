import React from "react";
import type { Species } from "../../types";
import { ResourceModal } from "../ResourceModal/ResourceModal";
import {
  ResourceDetailsList,
  type ResourceDetailsItem,
} from "../ResourceDetails/ResourceDetailsList";

interface SpeciesModalProps {
  species: Species | null;
  loading: boolean;
  open: boolean;
  onClose: () => void;
}

const createSpeciesItems = (species: Species): ResourceDetailsItem[] => [
  { label: "Name", value: species.name },
  { label: "Classification", value: species.classification },
  { label: "Designation", value: species.designation },
  { label: "Average Height", value: species.average_height },
  { label: "Skin Colors", value: species.skin_colors },
  { label: "Hair Colors", value: species.hair_colors },
  { label: "Eye Colors", value: species.eye_colors },
  { label: "Average Lifespan", value: species.average_lifespan },
  { label: "Language", value: species.language },
];

export const SpeciesModal: React.FC<SpeciesModalProps> = ({
  species,
  loading,
  open,
  onClose,
}) => {
  if (!open) return null;

  return (
    <ResourceModal
      title={species?.name || "Species"}
      open={open}
      onClose={onClose}
      loading={loading}
      loadingText="Loading species details..."
    >
      {species && <ResourceDetailsList items={createSpeciesItems(species)} />}
    </ResourceModal>
  );
};
