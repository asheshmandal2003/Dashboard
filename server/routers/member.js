import express from "express";
import { createMember, getMembers } from "../controllers/member.js";
import { upload } from "../utils/multerConfig.js";
import { validateMember } from "../validations/member.js";

const router = express.Router();

router
  .route("/:id/members")
  .get(getMembers)
  .post(upload.single("image"), validateMember, createMember);

export default router;
