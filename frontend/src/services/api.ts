import axios from "axios";
import { omit } from "lodash";
import { Facility } from "../types";
import { FacilityWithImage } from "@/store/facilitiesStore";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getFacilities = async (): Promise<Facility[]> => {
  const response = await axios.get(`${apiUrl}/facilities`);
  return response.data;
};

export const getFacility = async (id: string): Promise<Facility> => {
  const response = await axios.get(`${apiUrl}/facilities/${id}`);
  return response.data;
};

const uploadImage = async (image: File | null) => {
  if (image && image instanceof File) {
    const formData = new FormData();
    formData.append("file", image);
    const {
      data: { filePath },
    } = await axios.post(`${apiUrl}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return filePath;
  }
  return null;
};

export const createFacility = async (
  newFacility: Facility & { image: File | null }
): Promise<Facility> => {
  const imageUrl = await uploadImage(newFacility.image);

  const {
    data: [createdFacility],
  } = await axios.post(
    `${apiUrl}/facilities`,
    {
      ...omit(newFacility, ["image"]),
      ...(imageUrl ? { imageUrl } : {}),
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return createdFacility;
};

export const updateFacility = async (
  facilityId: number,
  updatedFacility: FacilityWithImage
): Promise<Facility> => {
  const imageUrl = updatedFacility.image
    ? await uploadImage(updatedFacility.image)
    : updatedFacility.imageUrl;

  const {
    data: [newlyUpdatedFacility],
  } = await axios.put(
    `${apiUrl}/facilities/${facilityId}`,
    {
      ...omit(updatedFacility, ["image"]),
      ...(imageUrl ? { imageUrl } : {}),
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return newlyUpdatedFacility;
};

export const deleteFacility = async (id: string): Promise<void> => {
  await axios.delete(`${apiUrl}/facilities/${id}`);
};
