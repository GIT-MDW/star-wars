import React from "react";
import type { Character } from "../../types";
import { ResourceModal } from "../ResourceModal/ResourceModal";
import {
  ResourceDetailsList,
  type ResourceDetailsItem,
} from "../ResourceDetails/ResourceDetailsList";

interface CharacterModalProps {
  character: Character | null;
  loading: boolean;
  open: boolean;
  onClose: () => void;
}

const createCharacterItems = (character: Character): ResourceDetailsItem[] => [
  { label: "Name", value: character.name },
  { label: "Height", value: character.height },
  { label: "Mass", value: character.mass },
  { label: "Hair Color", value: character.hair_color },
  { label: "Skin Color", value: character.skin_color },
  { label: "Eye Color", value: character.eye_color },
  { label: "Birth Year", value: character.birth_year },
  { label: "Gender", value: character.gender },
];

export const CharacterModal: React.FC<CharacterModalProps> = ({
  character,
  loading,
  open,
  onClose,
}) => {
  if (!open) return null;

  return (
    <ResourceModal
      title={character?.name || "Character"}
      open={open}
      onClose={onClose}
      loading={loading}
      loadingText="Loading character details..."
    >
      {character && (
        <ResourceDetailsList items={createCharacterItems(character)} />
      )}
    </ResourceModal>
  );
};
