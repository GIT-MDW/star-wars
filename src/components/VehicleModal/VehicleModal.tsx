import React from "react";
import type { Vehicle } from "../../types";
import { ResourceModal } from "../ResourceModal/ResourceModal";
import {
  ResourceDetailsList,
  type ResourceDetailsItem,
} from "../ResourceDetails/ResourceDetailsList";

interface VehicleModalProps {
  vehicle: Vehicle | null;
  loading: boolean;
  open: boolean;
  onClose: () => void;
}

const createVehicleItems = (vehicle: Vehicle): ResourceDetailsItem[] => [
  { label: "Name", value: vehicle.name },
  { label: "Model", value: vehicle.model },
  { label: "Manufacturer", value: vehicle.manufacturer },
  { label: "Cost", value: `${vehicle.cost_in_credits} credits` },
  { label: "Length", value: vehicle.length },
  { label: "Crew", value: vehicle.crew },
  { label: "Passengers", value: vehicle.passengers },
  { label: "Class", value: vehicle.vehicle_class },
];

export const VehicleModal: React.FC<VehicleModalProps> = ({
  vehicle,
  loading,
  open,
  onClose,
}) => {
  if (!open) return null;

  return (
    <ResourceModal
      title={vehicle?.name || "Vehicle"}
      open={open}
      onClose={onClose}
      loading={loading}
      loadingText="Loading vehicle details..."
    >
      {vehicle && <ResourceDetailsList items={createVehicleItems(vehicle)} />}
    </ResourceModal>
  );
};
