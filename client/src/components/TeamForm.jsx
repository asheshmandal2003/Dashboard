import { Button, Stack, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Formik, Form } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNotification } from "../utils/NotificationProvider";

const initialValues = {
  teamName: "",
};

function TeamForm({ organizationId, isMobile }) {
  const [loading, setLoading] = useState(() => false);
  const notify = useNotification();

  const validationSchema = yup.object({
    teamName: yup
      .string()
      .min(3, "Team name must be at least 3 characters")
      .required("Team name is required"),
  });

  async function createTeam(values, { resetForm }) {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.teamName);

    await axios
      .post(
        `${
          import.meta.env.VITE_SERVER_URL
        }/organizations/${organizationId}/teams`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        notify("Team created successfully", "success");
        resetForm();
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        resetForm();
        setLoading(false);
        notify("Failed to create team", "error");
      });
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={createTeam}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form aria-disabled={loading}>
          <Stack spacing={4} mt={3}>
            <TextField
              autoFocus
              id="teamName"
              name="teamName"
              label="Team Name"
              variant="standard"
              size={isMobile ? "small" : "medium"}
              placeholder="Enter team name"
              value={values.teamName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.teamName && Boolean(errors.teamName)}
              helperText={touched.teamName && errors.teamName}
            />
            <Button
              variant="contained"
              color="primary"
              size={isMobile ? "small" : "medium"}
              startIcon={<AddIcon />}
              type="submit"
              disabled={loading}
            >
              Create Team
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

export default TeamForm;
