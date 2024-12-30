import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, IconButton, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DropzoneContainer = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  textAlign: "center",
  cursor: "pointer",
  fontSize: "0.9rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const ImagePreview = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
  img: {
    maxWidth: "100px",
    maxHeight: "100px",
    borderRadius: theme.shape.borderRadius,
    objectFit: "cover",
  },
}));

export const FileDropzone = ({
  onFileChange,
  selectedFile,
  setSelectedFile,
  handleRemoveFile,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        onFileChange(file);
      }
    },
  });

  return (
    <DropzoneContainer {...getRootProps()}>
      <input {...getInputProps()} />
      {!selectedFile ? (
        <Typography variant="body2">
          Drag & drop an image, or click to select one
        </Typography>
      ) : (
        <ImagePreview>
          <img src={URL.createObjectURL(selectedFile)} alt="Selected" />
          <IconButton onClick={handleRemoveFile}>
            <CloseIcon />
          </IconButton>
        </ImagePreview>
      )}
    </DropzoneContainer>
  );
};
