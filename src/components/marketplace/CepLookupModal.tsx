"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { Location, useCepInput, useCepLookup } from "@/hooks/useUserLocation";
import { selectLocation, setLocation } from "@/store/slices/filters";
import { AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import React, { useCallback } from "react";
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

interface CepLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSet?: (location: Location) => void; // Optional callback for additional actions
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
