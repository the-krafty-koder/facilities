import Link from "next/link";
import { Typography, Stack } from "@mui/material";
import styles from "./page.module.css";

const Home = () => {
  return (
    <div className={styles.content}>
      <Stack spacing={2}>
        {" "}
        <Typography variant="h6">Welcome to Facilities app</Typography>
        <Link href="/facilities">View facilities</Link>
      </Stack>
    </div>
  );
};

export default Home;
