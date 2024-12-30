import { Member } from "../models/member.js";
import { Team } from "../models/team.js";
import { uploadImg } from "../utils/imgOperations.js";

export const createMember = async (req, res) => {
  try {
    const { name, team, email, location } = req.body;
    const memberData = { name, team, email, location };

    if (req.file) {
      const img = await uploadImg(req.file.buffer);
      memberData.image = {
        url: img.url,
        public_id: img.publicId,
      };
    } else {
      memberData.image = {
        url: null,
        public_id: null,
      };
    }
    const newMember = new Member(memberData);
    await newMember.save();
    await Team.findByIdAndUpdate(team, { $push: { members: newMember._id } });

    res
      .status(201)
      .json({ message: "Member created successfully", member: newMember });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create member" });
  }
};

export const getMembers = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id).populate("members");
    res.status(200).json({ members: team.members });
  } catch (error) {
    res.status(500).json({ error: "Failed to get members" });
  }
};
