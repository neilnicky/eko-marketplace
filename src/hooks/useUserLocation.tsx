"use client";

import {
  clearLocation,
  selectHasLocation,
  selectLocation,
  setLocation,
} from "@/store/slices/filters";
import { useCallback, useState, useTransition } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

export interface Location {
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

export function useUserLocation() {
  const dispatch = useAppDispatch();
  const location = useAppSelector(selectLocation);
  const hasLocation = useSelector(selectHasLocation);

  const updateLocation = useCallback(
    (newLocation: Location) => {
      dispatch(setLocation(newLocation));
    },
    [dispatch]
  );

  const removeLocation = useCallback(() => {
    dispatch(clearLocation());
  }, [dispatch]);

  return {
    location,
    hasLocation,
    updateLocation,
    removeLocation,
    // Convenience getters
    city: location?.city || "",
    state: location?.state || "",
    address: location?.address || "",
    // Formatted location string
    locationString: location ? `${location.city}, ${location.state}` : "",
    fullLocationString: location
      ? `${location.address ? location.address + ", " : ""}${location.city}, ${
          location.state
        }`
      : "",
  };
}

// Custom hook for CEP formatting and validation
export function useCepInput() {
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
export function useCepLookup() {
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
