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
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ModalComponent from "./ModalComponent";
import { useState } from "react";
import TeamForm from "./TeamForm";
import { Link } from "react-router-dom";

function TeamManagementList({ organization }) {
  const [open, setOpen] = useState(() => false);
  const handleOpen = () => setOpen(() => true);
  const handleClose = () => setOpen(() => false);
  return (
    <List>
      <Typography variant="h5" mt={6} mb={3} fontWeight={600}>
        Teams
      </Typography>
      <ListItem
        sx={{ cursor: "pointer" }}
        component={"div"}
        onClick={handleOpen}
      >
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Create New Team" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem
        sx={{ cursor: "pointer", color: "#fff" }}
        component={Link}
        state={organization}
        to="/members"
      >
        <ListItemIcon>
          <ManageAccountsRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Team Members" />
        <ChevronRightRoundedIcon />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem sx={{ cursor: "pointer" }}>
        <ListItemIcon>
          <AssignmentIndRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Assign Team Leader" />
        <ChevronRightRoundedIcon />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem sx={{ cursor: "pointer" }}>
        <ListItemIcon>
          <InfoOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="View Team Details" />
        <ChevronRightRoundedIcon />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ModalComponent
        open={open}
        handleClose={handleClose}
        text={"Create New Team"}
        form={<TeamForm organizationId={organization._id} />}
      />
    </List>
  );
}

export default TeamManagementList;
