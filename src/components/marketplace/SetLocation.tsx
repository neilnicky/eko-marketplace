"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import CepLookupModal from "./CepLookupModal";
import { useUserLocation } from "@/hooks/useUserLocation";

export default function SetLocation() {
  const [showCepModal, setShowCepModal] = useState(false);
  const { location, locationString } = useUserLocation();

  return (
    <div>
      <div className="px-2 sm:px-4">
        <Button
          variant="outline"
          onClick={() => setShowCepModal(true)}
          className="mb-2"
        >
          <MapPin className="h-4 w-4 mr-2" />
          {location?.city ? locationString : "Set Location"}
        </Button>
      </div>
      <CepLookupModal
        isOpen={showCepModal}
        onClose={() => setShowCepModal(false)}
      />
    </div>
  );
}
