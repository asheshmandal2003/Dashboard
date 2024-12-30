import { Box, Container, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import TeamManagementList from "../components/TeamManagementList";
import TeamMemberManagementList from "../components/TeamMemberManagementList";
import { useEffect, useState } from "react";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import axios from "axios";
import { useNotification } from "../utils/NotificationProvider";

function Home() {
  const [selectedOrg, setSelectedOrg] = useState(() => null);
  const [organizations, setOrganizations] = useState(() => []);
  const notify = useNotification();

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
    <Box sx={{ display: "flex" }}>
      <Sidebar
        organizations={organizations}
        selectedOrg={selectedOrg}
        setSelectedOrg={setSelectedOrg}
      />
      <Container>
        {selectedOrg ? (
          <>
            <Typography variant="h4" mt={3} fontWeight={600}>
              {selectedOrg.name}
            </Typography>
            <TeamManagementList organization={selectedOrg} />
            <TeamMemberManagementList organization={selectedOrg} />
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
              sx={{ fontSize: 100 }}
            />
            <Typography
              variant="h4"
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
