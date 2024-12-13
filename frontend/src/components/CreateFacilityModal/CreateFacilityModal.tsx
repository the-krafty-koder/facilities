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
  FormHelperText,
} from "@mui/material";
import { useFacilitiesStore } from "../../store/facilitiesStore";
import { Facility } from "../../types";
import styles from "./CreateFacilityModal.module.css";
import { z } from "zod";

interface CreateFacilityModalProps {
  open: boolean;
  onClose: () => void;
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

const facilityTypes = [
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
const validationSchema = z.object({
  name: z.string().nonempty(),
  type: z
    .string()
    .nonempty({ message: "You must select one option from the dropdown" }),
  streetAddress: z.string().nonempty(),
  city: z.string().nonempty(),
  state: z.string().nonempty(),
  zipCode: z.string().nonempty(),
  phoneNumber: z.string().nonempty(),
  siteLeader: z.string().optional(),
});

export default function CreateFacilityModal({
  open,
  onClose,
}: CreateFacilityModalProps) {
  const emptyFacility = {
    name: "",
    type: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    siteLeader: "",
  };
  const [facilityData, setFacilityData] = useState<Facility>(emptyFacility);
  const emptyErrors = {
    name: [],
    type: [],
    streetAddress: [],
    city: [],
    state: [],
    zipCode: [],
    phoneNumber: [],
    siteLeader: [],
  };
  const [validationErrors, setValidationErrors] = useState<{
    name?: string[];
    type?: string[];
    streetAddress?: string[];
    city?: string[];
    state?: string[];
    zipCode?: string[];
    phoneNumber?: string[];
    siteLeader?: string[];
    imageUrl?: string[];
  }>(emptyErrors);

  const [image, setImage] = useState<File | null>(null);

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
    const validation = validationSchema.safeParse(facilityData);
    if (validation.success) {
      await createFacility({ ...facilityData, image });
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
      setValidationErrors(emptyErrors);
      onClose();
    } else {
      const errors = validation.error.flatten().fieldErrors;
      setValidationErrors(errors);
    }
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
            required
            error={validationErrors.name?.length !== 0}
            helperText={validationErrors.name?.[0]}
          />
          <InputLabel className={styles.inputLabel}>Type</InputLabel>
          <Select
            value={facilityData.type}
            onChange={(event) =>
              setFacilityData({ ...facilityData, type: event.target.value })
            }
            label="Type"
            fullWidth
            required
            error={validationErrors.type?.length !== 0}
          >
            {facilityTypes.map((facilityType) => (
              <MenuItem key={facilityType} value={facilityType}>
                {facilityType}
              </MenuItem>
            ))}
          </Select>
          {validationErrors.type?.[0] && (
            <FormHelperText color="error">
              <span className={styles.formHelperText}>
                {validationErrors.type?.[0]}
              </span>
            </FormHelperText>
          )}

          <TextField
            label="Street Address"
            fullWidth
            margin="normal"
            value={facilityData.streetAddress}
            onChange={handleChange("streetAddress")}
            required
            error={validationErrors.streetAddress?.length !== 0}
            helperText={validationErrors.streetAddress?.[0]}
          />
          <TextField
            label="City"
            fullWidth
            margin="normal"
            value={facilityData.city}
            onChange={handleChange("city")}
            required
            error={validationErrors.city?.length !== 0}
            helperText={validationErrors.city?.[0]}
          />
          <TextField
            label="State"
            fullWidth
            margin="normal"
            value={facilityData.state}
            onChange={handleChange("state")}
            required
            error={validationErrors.state?.length !== 0}
            helperText={validationErrors.state?.[0]}
          />
          <TextField
            label="Zip Code"
            fullWidth
            margin="normal"
            value={facilityData.zipCode}
            onChange={handleChange("zipCode")}
            required
            error={validationErrors.zipCode?.length !== 0}
            helperText={validationErrors.zipCode?.[0]}
          />
          <TextField
            label="Phone Number"
            fullWidth
            margin="normal"
            value={facilityData.phoneNumber}
            onChange={handleChange("phoneNumber")}
            required
            error={validationErrors.phoneNumber?.length !== 0}
            helperText={validationErrors.phoneNumber?.[0]}
          />
          <TextField
            label="Site Leader"
            fullWidth
            margin="normal"
            value={facilityData.siteLeader}
            onChange={handleChange("siteLeader")}
            error={validationErrors.siteLeader?.length! > 0}
            helperText={validationErrors.siteLeader?.[0]}
          />

          <Box className={styles.modalFooter}>
            <Button
              onClick={() => {
                setValidationErrors(emptyErrors);
                setFacilityData(emptyFacility);
                onClose();
              }}
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
