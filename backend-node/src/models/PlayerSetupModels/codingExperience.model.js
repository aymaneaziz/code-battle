import mongoose from "mongoose";

const codingExperienceSchema = new mongoose.Schema(
  {
    experienceId: { type: String, required: true, unique: true },
    label: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    description: { type: String, required: true },
    iconUrl: { type: String, required: true },
  },
  { timestamps: true },
);

const CodingExperience =
  mongoose.models.CodingExperience ||
  mongoose.model("CodingExperience", codingExperienceSchema);
export default CodingExperience;
