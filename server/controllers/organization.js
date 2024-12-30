import { Organization } from "../models/organization.js";

export const createOrganization = async (req, res) => {
  try {
    const organization = new Organization(req.body);
    await organization.save();
    res.status(201).json(organization);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find().populate({
      path: "teams",
      select: "_id name",
    });
    res.status(200).json(organizations);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
