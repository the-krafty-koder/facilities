"use client";

import React from "react";
import { Box, Button, Modal, Typography, Stack } from "@mui/material";

interface DeleteFacilityModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  backgroundColor: "white",
  padding: "16px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const DeleteFacilityModal = ({
  open,
  onClose,
  onConfirm,
}: DeleteFacilityModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          Confirm Delete
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Are you sure you want to delete this facility? This action cannot be
          undone.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            color="error"
          >
            Delete
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default DeleteFacilityModal;
