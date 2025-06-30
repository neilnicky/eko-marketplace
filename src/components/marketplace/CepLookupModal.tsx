"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { selectLocation, setLocation } from "@/store/slices/filters";
import { AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import React, { useCallback, useState, useTransition } from "react";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

// Types
interface Location {
  city: string;
  state: string;
  address: string;
}

interface CepResponse {
  erro?: boolean; // Note: ViaCEP API uses 'erro' not 'error'
  localidade: string;
  uf: string;
  logradouro: string;
}

interface CepLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSet?: (location: Location) => void; // Optional callback for additional actions
}

// Custom hook for CEP formatting and validation
function useCepInput() {
  const [cep, setCep] = useState("");

  const formatCep = useCallback(
    (value: string): string => {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 8) {
        return numericValue
          .replace(/(\d{5})(\d)/, "$1-$2")
          .replace(/(-\d{3})\d+?$/, "$1");
      }
      return cep;
    },
    [cep]
  );

  const handleCepChange = useCallback(
    (value: string) => {
      const formatted = formatCep(value);
      setCep(formatted);
    },
    [formatCep]
  );

  const isValidCep = cep.length === 9;
  const cleanCep = cep.replace(/\D/g, "");

  return {
    cep,
    cleanCep,
    isValidCep,
    handleCepChange,
    resetCep: () => setCep(""),
  };
}

// Custom hook for CEP lookup logic
function useCepLookup() {
  const [lookupLocation, setLookupLocation] = useState<Location | null>(null);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const lookupCep = useCallback(async (cleanCep: string) => {
    if (cleanCep.length !== 8) {
      setError("Please enter a valid 8-digit CEP.");
      return;
    }

    startTransition(async () => {
      setError("");
      setLookupLocation(null);

      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${cleanCep}/json/`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: CepResponse = await response.json();

        if (data.erro) {
          setError("CEP not found. Please check the number.");
          setLookupLocation(null);
        } else {
          const location: Location = {
            city: data.localidade,
            state: data.uf,
            address: data.logradouro,
          };
          setLookupLocation(location);
        }
      } catch (err) {
        console.error("CEP lookup failed:", err);
        setError("Failed to fetch location. Please try again.");
        setLookupLocation(null);
      }
    });
  }, []);

  const resetLookup = useCallback(() => {
    setLookupLocation(null);
    setError("");
  }, []);

  return {
    lookupLocation,
    error,
    isPending,
    lookupCep,
    resetLookup,
  };
}

export default function CepLookupModal({
  isOpen,
  onClose,
  onLocationSet,
}: CepLookupModalProps) {
  const dispatch = useAppDispatch();
  const currentLocation = useAppSelector(selectLocation);

  const { cep, cleanCep, handleCepChange, isValidCep, resetCep } =
    useCepInput();
  const { lookupLocation, error, isPending, lookupCep, resetLookup } =
    useCepLookup();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      handleCepChange(value);

      // Auto-lookup when CEP is complete
      const formatted = value.replace(/\D/g, "");
      if (formatted.length === 8) {
        lookupCep(formatted);
      } else {
        resetLookup();
      }
    },
    [handleCepChange, lookupCep, resetLookup]
  );

  const handleManualLookup = useCallback(() => {
    if (isValidCep) {
      lookupCep(cleanCep);
    }
  }, [isValidCep, cleanCep, lookupCep]);

  const handleConfirm = useCallback(() => {
    if (lookupLocation) {
      // Update Redux store
      dispatch(setLocation(lookupLocation));

      // Call optional callback for additional actions
      onLocationSet?.(lookupLocation);

      handleClose();
    }
  }, [lookupLocation, dispatch, onLocationSet]);

  const handleClose = useCallback(() => {
    // Reset local state on close
    resetCep();
    resetLookup();
    onClose();
  }, [resetCep, resetLookup, onClose]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && isValidCep && !isPending) {
        handleManualLookup();
      }
    },
    [isValidCep, isPending, handleManualLookup]
  );

  // Show current location if available
  const displayLocation = lookupLocation || currentLocation;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Set Your Location</DialogTitle>
          <DialogDescription>
            Enter your ZIP code (CEP) to find products available in your region.
            {currentLocation && (
              <span className="block mt-2 text-sm text-muted-foreground">
                Current: {currentLocation.city}, {currentLocation.state}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cep">ZIP Code (CEP)</Label>
            <div className="flex gap-2">
              <Input
                id="cep"
                placeholder="00000-000"
                value={cep}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                maxLength={9}
                autoComplete="postal-code"
                aria-describedby={error ? "cep-error" : undefined}
              />
              <Button
                onClick={handleManualLookup}
                disabled={isPending || !isValidCep}
                size="default"
              >
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Find"
                )}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" id="cep-error">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {displayLocation && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                {lookupLocation ? "New location found" : "Current location"}:{" "}
                {displayLocation.city}, {displayLocation.state}
                {displayLocation.address && (
                  <div className="text-sm text-green-700 mt-1">
                    {displayLocation.address}
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!lookupLocation || isPending}
          >
            {lookupLocation && currentLocation
              ? "Update Location"
              : "Confirm Location"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
