"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useUserLocation } from "@/hooks/useUserLocation";
import {
  clearLocation,
  setLocation
} from "@/store/slices/filters";
import { MapPin, X } from "lucide-react";
import { useState } from "react";
import CepLookupModal from "./CepLookupModal";
// import { CepLookupModal } from "@/components/ui/cep-lookup-modal";

export default function SetLocation() {
  const [showModal, setShowModal] = useState(false);
  const { location, locationString, hasLocation } = useUserLocation();
  const dispatch = useAppDispatch();

  const handleLocationSet = (location: {
    city: string;
    state: string;
    address: string;
  }) => {
    dispatch(setLocation(location));
    setShowModal(false);
  };

  const handleClearLocation = () => {
    dispatch(clearLocation());
  };

  return (
    <div className="px-2 sm:px-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2"
        >
          <MapPin className="h-4 w-4" />
          {hasLocation ? `${locationString}` : "Set Location"}
        </Button>

        {location && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClearLocation}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <CepLookupModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onLocationSet={handleLocationSet}
      />
    </div>
  );
}
