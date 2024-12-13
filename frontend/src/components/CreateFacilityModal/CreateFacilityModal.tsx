"use client";

import React, { useState, ChangeEvent } from "react";
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
import styles from "./CreateFacilityModal.module.css";

interface CreateFacilityModalProps {
  open: boolean;
  onClose: () => void;
}

const modalStyle = {
  position: "absolute" as "absolute",
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

export default function CreateFacilityModal({
  open,
  onClose,
}: CreateFacilityModalProps) {
  const [facilityData, setFacilityData] = useState<Facility>({
    name: "",
    type: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    siteLeader: "",
  });
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

  const createFacility = useFacilitiesStore(
    (state) => state.createFacilityState
  );

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setImage(file);
  };

  const handleChange =
    (field: keyof typeof facilityData) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setFacilityData({ ...facilityData, [field]: event.target.value });
    };

  const handleCreate = async () => {
    await createFacility({ ...facilityData, image });
    onClose();
    setFacilityData({
      name: "",
      type: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      phoneNumber: "",
      siteLeader: "",
    });
    setImage(null);
  };

  return (
    <div style={{ overflow: "scroll" }}>
      <Modal open={open} onClick={onClose}>
        <Box sx={modalStyle} onClick={(e) => e.stopPropagation()}>
          <Typography variant="h6" gutterBottom>
            Add Facility
          </Typography>
          <Typography variant="subtitle2" className={styles.subtitle}>
            Fill in the form below to create a new facility. The * indicates
            that the field is required.
          </Typography>

          <TextField
            type="file"
            label="Click here to upload facility image"
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
            <Button
              onClick={onClose}
              color="secondary"
              className={styles.cancelButton}
            >
              Cancel
            </Button>
            <Button onClick={handleCreate} color="primary" variant="contained">
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
