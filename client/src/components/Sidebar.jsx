import {
  Box,
  IconButton,
  Skeleton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import { FlexCenter } from "../utils/FlexCenter";
import List from "./List";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import { useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const Sidebar = ({ organizations, selectedOrg, setSelectedOrg }) => {
  const [closeDrawer, setCloseDrawer] = useState(() => false);
  function toggleDrawer() {
    setCloseDrawer((prev) => !prev);
  }
  return (
    <Box
      sx={{
        width: closeDrawer ? 68 : 270,
        height: "100vh",
        borderRight: "1px solid #bdbdbd",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.5s ease-in-out",
        overflow: "hidden",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          borderBottom: "1px solid #bdbdbd",
        }}
      >
        <FlexCenter sx={{ gap: 1, py: 3 }}>
          {closeDrawer ? (
            <IconButton onClick={toggleDrawer}>
              <MenuRoundedIcon />
            </IconButton>
          ) : (
            <>
              <SpaceDashboardIcon sx={{ fontSize: 34, color: "#4dabf5" }} />
              <Typography variant="h6" fontWeight={600} color="#4dabf5">
                Dashboard
              </Typography>
            </>
          )}
        </FlexCenter>
        {!closeDrawer && (
          <IconButton onClick={toggleDrawer}>
            <MenuOpenRoundedIcon />
          </IconButton>
        )}
      </Toolbar>
      {organizations.length === 0 ? (
        <Stack spacing={1}>
          <Skeleton variant="rectangular" height={40} />
          <Skeleton variant="rectangular" height={40} />
          <Skeleton variant="rectangular" height={40} />
          <Skeleton variant="rectangular" height={40} />
        </Stack>
      ) : (
        <List
          closeDrawer={closeDrawer}
          organizations={organizations}
          selectedOrg={selectedOrg}
          setSelectedOrg={setSelectedOrg}
        />
      )}
    </Box>
  );
};

export default Sidebar;
