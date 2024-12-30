import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import List from "./List";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { IconButton } from "@mui/material";

export default function SideMenu({
  closeDrawer,
  organizations,
  selectedOrg,
  setSelectedOrg,
}) {
  const [anchorEl, setAnchorEl] = useState(() => null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuRoundedIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <List
          closeDrawer={closeDrawer}
          organizations={organizations}
          selectedOrg={selectedOrg}
          setSelectedOrg={setSelectedOrg}
        />
      </Menu>
    </div>
  );
}
