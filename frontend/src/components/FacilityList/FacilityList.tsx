"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useFacilitiesStore } from "../../store/facilitiesStore";

import styles from "./FacilityList.module.css";

import { useRouter } from "next/navigation";
import CreateFacilityModal from "../CreateFacilityModal/CreateFacilityModal";
import DeleteFacilityModal from "../DeleteFacilityModal/DeleteFacilityModal";
import UpdateFacilityModal from "../UpdateFacilityModal/UpdateFacilityModal";

const FacilityList = () => {
  const { facilities, deleteFacility, fetchFacilities } = useFacilitiesStore();
  const [openCreate, setOpenCreate] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFacilityId, setSelectedFacilityId] = useState<number | null>(
    null
  );
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const router = useRouter();

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setSelectedFacilityId(id);
    setMenuAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  const handleOpenUpdateModal = () => {
    setIsUpdateModalOpen(true);
    handleCloseMenu();
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    handleCloseMenu();
  };

  const handleCloseDeleteModal = () => {
    setSelectedFacilityId(null);
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    fetchFacilities();
  }, [fetchFacilities]);

  return (
    <Box className={styles.table}>
      <Button
        onClick={() => setOpenCreate(true)}
        variant="contained"
        className={styles.addFacility}
      >
        Add Facility
      </Button>
      <CreateFacilityModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
      />

      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell>Facility image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Street address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Zip code</TableCell>
              <TableCell>Phone number</TableCell>
              <TableCell>Site leader</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {facilities.map((facility) => (
              <TableRow
                hover
                key={facility.id}
                onClick={() => router.push(`/facilities/${facility.id}`)}
                className={styles.tableRow}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <IconButton
                    aria-label="more"
                    aria-controls="action-menu"
                    aria-haspopup="true"
                    onClick={(e) => handleOpenMenu(e, facility.id!)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={menuAnchorEl}
                    keepMounted
                    open={
                      Boolean(menuAnchorEl) &&
                      selectedFacilityId === facility.id
                    }
                    onClose={handleCloseMenu}
                  >
                    <MenuItem onClick={handleOpenUpdateModal}>Update</MenuItem>
                    <MenuItem onClick={handleOpenDeleteModal}>Delete</MenuItem>
                  </Menu>
                </TableCell>
                <TableCell>
                  {facility.imageUrl ? (
                    <div className={styles.imageContainer}>
                      <img
                        src={facility.imageUrl}
                        alt={facility.name}
                        className={styles.facilityImage}
                      />
                    </div>
                  ) : (
                    <span> No image</span>
                  )}
                </TableCell>
                <TableCell>{facility.name}</TableCell>
                <TableCell>{facility.type}</TableCell>

                <TableCell>{facility.streetAddress}</TableCell>

                <TableCell>{facility.city}</TableCell>

                <TableCell>{facility.state}</TableCell>

                <TableCell>{facility.zipCode}</TableCell>

                <TableCell>{facility.phoneNumber}</TableCell>

                <TableCell>{facility.siteLeader}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedFacilityId && (
        <UpdateFacilityModal
          open={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          facilityId={selectedFacilityId}
        />
      )}

      {selectedFacilityId && (
        <DeleteFacilityModal
          open={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={() => {
            deleteFacility(selectedFacilityId);
          }}
        />
      )}
    </Box>
  );
};

export default FacilityList;
