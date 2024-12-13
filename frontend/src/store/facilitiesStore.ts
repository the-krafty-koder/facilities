import { create } from "zustand";
import { Facility } from "../types";
import {
  getFacilities,
  deleteFacility,
  updateFacility,
  createFacility,
} from "../services/api";

export type FacilityWithImage = Facility & { image: File | null };

type FacilitiesStore = {
  facilities: Facility[];
  fetchFacilities: () => void;
  createFacilityState: (newFacility: FacilityWithImage) => void;
  updateFacilityState: (id: number, updatedFacility: FacilityWithImage) => void;
  deleteFacility: (id: number) => void;
};

export const useFacilitiesStore = create<FacilitiesStore>((set) => ({
  facilities: [],
  fetchFacilities: async () => {
    const facilities = await getFacilities();
    set({ facilities });
  },
  createFacilityState: async (
    newFacility: Facility & { image: File | null }
  ) => {
    const createdFacility = await createFacility(newFacility);
    set((state) => ({
      facilities: [...state.facilities, createdFacility],
    }));
  },
  updateFacilityState: async (
    id: number,
    updatedFacility: FacilityWithImage
  ) => {
    const facilityFromBackend = await updateFacility(id, updatedFacility);
    set((state) => ({
      facilities: state.facilities.map((facility) =>
        facility.id === id ? facilityFromBackend : facility
      ),
    }));
  },
  deleteFacility: async (id: number) => {
    await deleteFacility(id.toString());
    set((state) => ({
      facilities: state.facilities.filter((facility) => facility.id !== id),
    }));
  },
}));
