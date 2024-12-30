import { Box, Container, Toolbar, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import TeamManagementList from "../components/TeamManagementList";
import TeamMemberManagementList from "../components/TeamMemberManagementList";
import { useEffect, useState } from "react";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import axios from "axios";
import { useNotification } from "../utils/NotificationProvider";
import { useMediaQuery } from "@mui/material";
import SideMenu from "../components/SideMenu";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";

function Home() {
  const [selectedOrg, setSelectedOrg] = useState(() => null);
  const [organizations, setOrganizations] = useState(() => []);
  const notify = useNotification();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    async function fetchOrgs() {
      await axios
        .get(`${import.meta.env.VITE_SERVER_URL}/organizations`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setOrganizations(response.data);
        })
        .catch((error) => {
          notify("Failed to fetch organizations", "error");
        });
    }
    fetchOrgs();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row" }}>
      {isMobile ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <SideMenu
              organizations={organizations}
              selectedOrg={selectedOrg}
              setSelectedOrg={setSelectedOrg}
            />
            <Toolbar
              sx={{
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <SpaceDashboardIcon
                sx={{ fontSize: isMobile ? 18 : 34, color: "#4dabf5" }}
              />
              <Typography variant="h6" fontWeight={600} color="#4dabf5">
                Dashboard
              </Typography>
            </Toolbar>
          </Box>
        </>
      ) : (
        <Sidebar
          organizations={organizations}
          selectedOrg={selectedOrg}
          setSelectedOrg={setSelectedOrg}
        />
      )}
      <Container>
        {selectedOrg ? (
          <>
            <Typography
              variant={isMobile ? "h6" : "h4"}
              mt={3}
              fontWeight={600}
            >
              {selectedOrg.name}
            </Typography>
            <TeamManagementList
              organization={selectedOrg}
              isMobile={isMobile}
            />
            <TeamMemberManagementList
              organization={selectedOrg}
              isMobile={isMobile}
            />
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <WarningAmberRoundedIcon
              color="rgba(255, 255, 255, 0.7)"
              sx={{ fontSize: isMobile ? 50 : 100 }}
            />
            <Typography
              variant={isMobile ? "body1" : "h4"}
              mt={3}
              fontWeight={600}
              color="text.secondary"
            >
              Select an organization to view details
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Home;
