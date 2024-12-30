import ListComponent from "@mui/material/List";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";

function List({ closeDrawer, organizations, selectedOrg, setSelectedOrg }) {
  return (
    <ListComponent
      disablePadding
      sx={{
        height: "100%",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          width: "2px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#bdbdbd",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#4dabf5",
        },
      }}
    >
      {!closeDrawer && <ListSubheader>Organizations</ListSubheader>}
      {organizations.map((item) => (
        <ListItem
          key={item._id}
          onClick={() => setSelectedOrg(item)}
          disablePadding
          selected={selectedOrg && selectedOrg._id === item._id}
          sx={{
            backgroundColor:
              selectedOrg && selectedOrg._id === item._id
                ? "rgba(33, 150, 243, 0.2)"
                : "transparent",
            color:
              selectedOrg && selectedOrg._id === item._id ? "#2196F3" : "#fff",
          }}
        >
          <ListItemButton sx={{ py: 2 }}>
            <ListItemIcon
              sx={{
                color:
                  selectedOrg && selectedOrg._id === item._id
                    ? "#2196F3"
                    : "#fff",
              }}
            >
              <BusinessRoundedIcon />
            </ListItemIcon>
            {!closeDrawer && <ListItemText primary={item.name} />}
          </ListItemButton>
        </ListItem>
      ))}
    </ListComponent>
  );
}

export default List;
