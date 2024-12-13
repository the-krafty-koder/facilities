"use client";
import { useParams } from "next/navigation";
import { useFacilitiesStore } from "../../../store/facilitiesStore";
import { Box, Typography, Paper, Stack, Divider } from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Link from "next/link";
import styles from "./page.module.css";

const FacilityDetails = () => {
  const { id: facilityId } = useParams<{ id: string }>();
  const { facilities } = useFacilitiesStore();
  const facility = facilities.find((fac) => fac.id === parseInt(facilityId));

  if (!facility) {
    return <Typography variant="h5">Facility not found</Typography>;
  }

  return (
    <Box className={styles.container}>
      <div>
        <Link href="/facilities">Facilities</Link>
        <span className={styles.seperator}>/</span>
        <Link href={`/facilities/${facilityId}`} className={styles.detailsLink}>
          Facilities {facilityId}
        </Link>
      </div>
      <Typography className={styles.header} variant="h6">
        Facility {facilityId}
      </Typography>
      <Paper className={styles.paperContainer}>
        <Typography variant="subtitle1" className={styles.information}>
          Facility information
        </Typography>

        <Box className={styles.imageContainer}>
          {facility.imageUrl ? (
            <img
              src={facility.imageUrl}
              alt={facility.name}
              className={styles.image}
            />
          ) : (
            <span> No image uploaded</span>
          )}
        </Box>
        <Stack spacing={3}>
          <Box>
            <Stack direction="row" spacing={2}>
              <ApartmentIcon />
              <Typography>Name</Typography>
            </Stack>
            <Typography>{facility.name}</Typography>
            <Divider />
          </Box>
          <Box>
            <Stack direction="row" spacing={2}>
              <ApartmentIcon />
              <Typography>Type</Typography>
            </Stack>
            <Typography>{facility.type}</Typography>
            <Divider />
          </Box>
          <Box>
            <Stack direction="row" spacing={2}>
              <ApartmentIcon />
              <Typography>Address</Typography>
            </Stack>
            <Typography>{facility.streetAddress}</Typography>
            <Divider />
          </Box>
          <Box>
            <Stack direction="row" spacing={2}>
              <ApartmentIcon />
              <Typography>City</Typography>
            </Stack>
            <Typography>{facility.city}</Typography>
            <Divider />
          </Box>
          <Box>
            <Stack direction="row" spacing={2}>
              <ApartmentIcon />
              <Typography>State</Typography>
            </Stack>
            <Typography>{facility.state}</Typography>
            <Divider />
          </Box>
          <Box>
            <Stack direction="row" spacing={2}>
              <ApartmentIcon />
              <Typography>Zip code</Typography>
            </Stack>
            <Typography>{facility.zipCode}</Typography>
            <Divider />
          </Box>
          <Box>
            <Stack direction="row" spacing={2}>
              <ApartmentIcon />
              <Typography>Phone number</Typography>
            </Stack>
            <Typography>{facility.phoneNumber}</Typography>
            <Divider />
          </Box>
          <Box>
            <Stack direction="row" spacing={2}>
              <ApartmentIcon />
              <Typography>Site Leader</Typography>
            </Stack>
            <Typography>{facility.siteLeader}</Typography>
            <Divider />
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default FacilityDetails;
