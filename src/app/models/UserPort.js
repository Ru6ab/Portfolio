import mongoose from "mongoose";

// MAIN SECTION
const MainSectionSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  badges: { type: [String], default: [] },
  img: { type: String, default: "" },
});

// PROFILE
const ProfileSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  gitHubUrl: { type: String, default: "" },
  facebookUrl: { type: String, default: "" },
  twitterUrl: { type: String, default: "" },
  linkedInUrl: { type: String, default: "" },
  img: { type: String, default: "" },
});

// EDUCATION / AWARD / LEADERSHIP (reused structure)
const EducationSchema = new mongoose.Schema({
  school: { type: String, default: "" },
  degree: { type: String, default: "" },
  year: { type: String, default: "" },
});

const AwardSchema = EducationSchema;
const LeadershipSchema = EducationSchema;

// PROJECTS
const ProjectSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  contributions: { type: [String], default: [] },
  detailedDescription: { type: String, default: "" },
});

// EXPERIENCE
const ExperienceSchema = new mongoose.Schema({
  designation: { type: String, default: "" },   // <-- fixed
  duration: { type: String, default: "" },
  organization: { type: String, default: "" },
  topics: { type: [String], default: [] },
});

// ABOUT
const AboutSchema = new mongoose.Schema({
  description: { type: String, default: "" },
  email: { type: String, default: "" },
  dob: { type: Date, default: null },
  cv: { type: String, default: "" },
});

// PUBLICATIONS
const PublicationSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  status: { type: String, default: "" },
  description: { type: String, default: "" },
});

// LANGUAGES
const LanguageSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  percentage: { type: Number, default: 0 },
});

// MAIN USER PORTFOLIO
const UserPortSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  main: { type: MainSectionSchema, default: {} },
  about: { type: AboutSchema, default: {} },
  profile: { type: ProfileSchema, default: {} },

  skill: { type: [String], default: [] },
  interest: { type: [String], default: [] },

  education: { type: [EducationSchema], default: [] },
  project: { type: [ProjectSchema], default: [] },
  experience: { type: [ExperienceSchema], default: [] },
  publication: { type: [PublicationSchema], default: [] },
  award: { type: [AwardSchema], default: [] },
  leadership: { type: [LeadershipSchema], default: [] },
  language: { type: [LanguageSchema], default: [] },
});

export default mongoose.models.UserPort ||
  mongoose.model("UserPort", UserPortSchema);

