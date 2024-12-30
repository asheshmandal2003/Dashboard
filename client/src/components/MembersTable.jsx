import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Avatar,
  Paper,
  Toolbar,
  Typography,
  Skeleton,
} from "@mui/material";
import Brightness1Icon from "@mui/icons-material/Brightness1";

export const TableComponent = ({ teamName, members, loading, isMobile }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const renderSkeletonRow = () => (
    <TableRow>
      {[...Array(5)].map((_, index) => (
        <TableCell key={index}>
          <Skeleton variant={index === 0 ? "circular" : "text"} width="80%" />
        </TableCell>
      ))}
    </TableRow>
  );

  return (
    <Paper sx={{ mb: 5 }}>
      <TableContainer
        sx={{
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            height: "2px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#bdbdbd",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#4dabf5",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#eee",
          },
        }}
      >
        <Table>
          <TableHead>
            <Toolbar disableGutters sx={{ pl: 2 }}>
              <Typography variant={isMobile ? "body1" : "h6"} fontWeight={600}>
                {teamName}
              </Typography>
            </Toolbar>
            <TableRow>
              <TableCell>Profile Picture</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              [...Array(rowsPerPage)].map((_, index) => renderSkeletonRow())
            ) : members.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No members found
                </TableCell>
              </TableRow>
            ) : (
              members
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((member) => (
                  <TableRow key={member._id}>
                    <TableCell>
                      <Avatar src={member.image?.url || undefined}>
                        {!member.image && member.name.charAt(0).toUpperCase()}
                      </Avatar>
                    </TableCell>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.location}</TableCell>
                    <TableCell>
                      <Brightness1Icon
                        color={member.image?.url ? "success" : "error"}
                      />
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={members.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
};
