import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { FileDropzone } from "./FileDropZone";
import axios from "axios";
import { useNotification } from "../utils/NotificationProvider";

function MemberForm({ teams }) {
  const [imageFile, setImageFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(() => false);
  const notify = useNotification();

  const initialValues = {
    name: "",
    email: "",
    location: "",
    team: "",
  };

  const handleFileChange = (file) => {
    setImageFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setImageFile(null);
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(5, "Minimum 5 characters are required!")
      .required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    location: yup.string().required("Location is required"),
    team: yup.string().required("Team is required"),
  });

  const createMember = async (values, { resetForm }) => {
    setLoading(true);
    const formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/teams/${values.team}/members`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      notify("Member added successfully", "success");
      resetForm();
      handleRemoveFile();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notify("Failed to add member", "error");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={createMember}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => (
        <Form encType="multipart/form-data" disabled={loading}>
          <Stack spacing={2} mt={3}>
            <FileDropzone
              onFileChange={(file) => {
                handleFileChange(file);
                setSelectedFile(file);
              }}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              handleRemoveFile={handleRemoveFile}
            />
            {imageFile && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Selected file: {imageFile.name}
              </Typography>
            )}

            <TextField
              autoFocus
              id="name"
              name="name"
              label="Name"
              variant="standard"
              size="small"
              placeholder="John Doe"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="standard"
              size="small"
              placeholder="johndoe@example.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              id="location"
              name="location"
              label="Location"
              variant="standard"
              size="small"
              placeholder="City, Country"
              value={values.location}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.location && Boolean(errors.location)}
              helperText={touched.location && errors.location}
            />
            <FormControl
              variant="standard"
              error={touched.team && Boolean(errors.team)}
            >
              <InputLabel id="team-select-label">Team</InputLabel>
              <Select
                labelId="team-select-label"
                id="team"
                name="team"
                value={values.team}
                onChange={(e) => setFieldValue("team", e.target.value)}
                onBlur={handleBlur}
                label="Team"
                size="small"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {teams.map((team) => (
                  <MenuItem key={team._id} value={team._id}>
                    {team.name}
                  </MenuItem>
                ))}
              </Select>
              {touched.team && errors.team && (
                <Typography variant="body2" color="error">
                  {errors.team}
                </Typography>
              )}
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              startIcon={<AddIcon />}
              color="primary"
              size="small"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Member"}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

export default MemberForm;
