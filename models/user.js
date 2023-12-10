import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username cannot be blank"],
      unique: [true, "Username already taken"],
    },
    email: {
      type: String,
      required: [true, "Email cannot be blank"],
      unique: [true, "Email already taken"],
    },
    password: {
      type: String,
      required: [true, "Password cannot be blank"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
