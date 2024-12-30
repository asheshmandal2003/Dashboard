import { Schema } from "mongoose";
import mongoose from "mongoose";

const organizationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    teams: [
      {
        type: Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Organization = mongoose.model("Organization", organizationSchema);
