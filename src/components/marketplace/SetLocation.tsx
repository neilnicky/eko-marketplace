"use client";

import { useAppSelector } from "@/hooks/reduxHooks";
import { selectLocation } from "@/store/slices/filters";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import CepLookupModal from "./CepLookupModal";

export default function SetLocation() {
  const [showCepModal, setShowCepModal] = useState(false);
  const currentLocation = useAppSelector(selectLocation);

  return (
    <div>
      <CepLookupModal
        isOpen={showCepModal}
        onClose={() => setShowCepModal(false)}
      />
      <div className="px-2 sm:px-4">
        <Button
          variant="outline"
          onClick={() => setShowCepModal(true)}
          className="mb-2"
        >
          <MapPin className="h-4 w-4 mr-2" />
          {currentLocation?.city
            ? `${currentLocation.city}, ${currentLocation.state}`
            : "Set Location"}
        </Button>
      </div>
    </div>
  );
}
