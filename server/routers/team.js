import express from "express";
import {
  createTeam,
  getOrganizationTeamsWithMembers,
  getTeams,
} from "../controllers/team.js";
import { validateTeam } from "../validations/team.js";

const router = express.Router();

router.route("/:id/teams").get(getTeams).post(validateTeam, createTeam);
router.route("/:id/teams/members").get(getOrganizationTeamsWithMembers);

export default router;
