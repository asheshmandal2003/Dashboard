import { Team } from "../models/team.js";
import { Organization } from "../models/organization.js";

export const createTeam = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const org = await Organization.findById(id);
    if (!org) {
      return res.status(404).json({ error: "Organization not found" });
    }

    const newTeam = new Team({ name });
    await newTeam.save();
    org.teams.push(newTeam._id);
    await org.save();

    res
      .status(201)
      .json({ message: "Team created successfully", team: newTeam });
  } catch (error) {
    res.status(500).json({ error: "Failed to create team" });
  }
};

export const getTeams = async (req, res) => {
  try {
    const { id } = req.params;

    const org = await Organization.findById(id).populate("teams");
    if (!org) {
      return res.status(404).json({ error: "Organization not found" });
    }

    res.status(200).json({ teams: org.teams });
  } catch (error) {
    res.status(500).json({ error: "Failed to get teams" });
  }
};

export const getOrganizationTeamsWithMembers = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 5 } = req.query;

    const pageNum = parseInt(page, 5);
    const pageLimit = parseInt(limit, 5);

    if (pageNum <= 0 || pageLimit <= 0) {
      return res.status(400).json({ error: "Invalid page or limit values" });
    }

    const organization = await Organization.findById(id).populate({
      path: "teams",
      populate: {
        path: "members",
        select: "name email location image",
        options: {
          skip: (pageNum - 1) * pageLimit,
          limit: pageLimit,
        },
      },
    });

    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }

    res.status(200).json({
      organization: organization.name,
      teams: organization.teams,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch teams and members" });
  }
};
