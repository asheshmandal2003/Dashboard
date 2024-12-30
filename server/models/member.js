import { Schema } from "mongoose";
import mongoose from "mongoose";

const imageSchema = new Schema({
  url: {
    type: String,
  },
  public_id: {
    type: String,
  },
});

const memberSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: imageSchema,
  },
  {
    timestamps: true,
  }
);

export const Member = mongoose.model("Member", memberSchema);
