import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Divider, IconButton } from "@mui/material";

export default function ModalComponent({
  open,
  handleClose,
  text,
  form,
  isMobile,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? 300 : 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: 8,
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography
              id="modal-modal-title"
              variant={isMobile ? "body1" : "h5"}
              fontWeight={600}
              component="h2"
            >
              {text}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseRoundedIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          </Box>
          <Divider />
          {form}
        </Box>
      </Modal>
    </div>
  );
}
