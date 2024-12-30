import express from "express";
import {
  createOrganization,
  getOrganizations,
} from "../controllers/organization.js";
import { validateOrganization } from "../validations/organization.js";

const router = express.Router();

router
  .route("/")
  .get(getOrganizations)
  .post(validateOrganization, createOrganization);

export default router;
