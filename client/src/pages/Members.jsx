import { Box, Container, IconButton, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { TableComponent } from "../components/MembersTable";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNotification } from "../utils/NotificationProvider";
import { useMediaQuery } from "@mui/material";

export function Members() {
  const location = useLocation();
  const organization = location.state;
  const [data, setData] = useState(() => null);
  const [loading, setLoading] = useState(() => true);
  const notify = useNotification();
  const isMobile = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    async function fetchTeamWithMembers() {
      await axios
        .get(
          `${import.meta.env.VITE_SERVER_URL}/organizations/${
            organization._id
          }/teams/members`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          notify("Failed to fetch teams and members", "error");
        });
    }
    fetchTeamWithMembers();
  }, []);
  return (
    <Container>
      <Box display="flex" alignItems="center">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="back"
          sx={{ mx: 2, my: 4 }}
          onClick={() => window.history.back()}
        >
          <ArrowBackRoundedIcon />
        </IconButton>
        <Typography
          variant={isMobile ? "h6" : "h4"}
        >{`${organization.name} Members`}</Typography>
      </Box>
      {data && data.teams.length !== 0 ? (
        <Typography variant={isMobile ? "body1" : "h6"} sx={{ mb: 2 }}>
          {`Total Teams: ${data.teams.length}`}
        </Typography>
      ) : (
        <Typography variant="h6" sx={{ mb: 2 }}>
          No teams found
        </Typography>
      )}
      {data &&
        data.teams.map((team) => (
          <TableComponent
            key={team._id}
            teamName={team.name}
            members={team.members}
            loading={loading}
            isMobile={isMobile}
          />
        ))}
    </Container>
  );
}
