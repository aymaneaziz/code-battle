import mongoose from "mongoose";

const codingExperienceSchema = new mongoose.Schema(
  {
    experienceId: { type: String, required: true, unique: true, trim: true },
    label: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    description: { type: String, required: true, trim: true },
    iconUrl: { type: String, required: true, trim: true },
  },
  { timestamps: true, _id: false },
);

const CodingExperience = mongoose.model(
  "CodingExperience",
  codingExperienceSchema,
);
export default CodingExperience;
