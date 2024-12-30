import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded";
import ModalComponent from "./ModalComponent";
import { useState } from "react";
import MemberForm from "./MemberForm";
import { Link } from "react-router-dom";

function TeamMemberManagementList({ organization }) {
  const [open, setOpen] = useState(() => false);
  const handleOpen = () => setOpen(() => true);
  const handleClose = () => setOpen(() => false);
  return (
    <List>
      <Typography variant="h5" mt={6} mb={3} fontWeight={600}>
        Members
      </Typography>
      <ListItem sx={{ cursor: "pointer" }} component="div" onClick={handleOpen}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Create New Member" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem sx={{ cursor: "pointer" }}>
        <ListItemIcon>
          <AssignmentIndRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Assign Member Roles" />
        <ChevronRightRoundedIcon />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem
        sx={{ cursor: "pointer", color: "#fff" }}
        component={Link}
        to="/members"
        state={organization}
      >
        <ListItemIcon>
          <GroupRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="View Members" />
        <ChevronRightRoundedIcon />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ModalComponent
        open={open}
        handleClose={handleClose}
        text={"Create New Member"}
        form={<MemberForm teams={organization.teams} />}
      />
    </List>
  );
}

export default TeamMemberManagementList;
