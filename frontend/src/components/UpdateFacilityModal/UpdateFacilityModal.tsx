"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useFacilitiesStore } from "../../store/facilitiesStore";
import { Facility } from "../../types";
import styles from "./UpdateFacilityModal.module.css";

interface UpdateFacilityModalProps {
  open: boolean;
  onClose: () => void;
  facilityId: number;
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  height: "80%",
  overflow: "scroll",
};

export default function UpdateFacilityModal({
  open,
  onClose,
  facilityId,
}: UpdateFacilityModalProps) {
  const { facilities, updateFacilityState } = useFacilitiesStore();
  const [facilityData, setFacilityData] = useState<Facility | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const types = [
    "Manufacturing Plants",
    "Warehouses",
    "Distribution Centers",
    "Research and Development Centers",
    "Maintenance and Repair Facilities",
    "Logistics Hubs",
    "Quality Control Laboratories",
    "Refineries",
    "Energy Plants",
    "Water Treatment Plants",
    "Smelting and Refining Facilities",
    "Chemical Processing Plants",
    "Assembly Plants",
  ];

  useEffect(() => {
    const facility = facilities.find((f) => f.id === facilityId);
    if (facility) {
      setFacilityData(facility);
    }
  }, [facilityId, facilities]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setImage(file);
  };

  const handleChange =
    (field: keyof Facility) =>
    (event: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
      if (facilityData) {
        setFacilityData({
          ...facilityData,
          [field]: event.target.value as string,
        });
      }
    };

  const handleUpdate = async () => {
    if (facilityData) {
      await updateFacilityState(facilityId, { ...facilityData, image });
      onClose();
    }
  };

  if (!facilityData) return null;

  return (
    <div style={{ overflow: "scroll" }}>
      <Modal open={open} onClick={onClose}>
        <Box sx={modalStyle} onClick={(e) => e.stopPropagation()}>
          <Typography variant="h6" gutterBottom>
            Update Facility
          </Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.5 }}>
            Modify the details below to update the facility. The * indicates
            that the field is required.
          </Typography>

          <TextField
            type="file"
            label="Click here to upload new facility image"
            InputLabelProps={{ shrink: true }}
            className={styles.file}
            onChange={handleFileChange}
          />
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={facilityData.name}
            onChange={handleChange("name")}
          />
          <InputLabel className={styles.inputLabel}>Type</InputLabel>
          <Select
            id="demo-simple-select-label"
            value={facilityData.type}
            onChange={(event) =>
              setFacilityData({ ...facilityData, type: event.target.value })
            }
            label="Type"
            fullWidth
          >
            {types.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Street Address"
            fullWidth
            margin="normal"
            value={facilityData.streetAddress}
            onChange={handleChange("streetAddress")}
            required
          />
          <TextField
            label="City"
            fullWidth
            margin="normal"
            value={facilityData.city}
            onChange={handleChange("city")}
            required
          />
          <TextField
            label="State"
            fullWidth
            margin="normal"
            value={facilityData.state}
            onChange={handleChange("state")}
            required
          />
          <TextField
            label="Zip Code"
            fullWidth
            margin="normal"
            value={facilityData.zipCode}
            onChange={handleChange("zipCode")}
            required
          />
          <TextField
            label="Phone Number"
            fullWidth
            margin="normal"
            value={facilityData.phoneNumber}
            onChange={handleChange("phoneNumber")}
            required
          />
          <TextField
            label="Site Leader"
            fullWidth
            margin="normal"
            value={facilityData.siteLeader}
            onChange={handleChange("siteLeader")}
          />

          <Box className={styles.modalFooter}>
            <Button onClick={onClose} sx={{ marginRight: 1 }} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpdate} color="primary" variant="contained">
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
