const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String }, // Add this field
    role: { type: String, default: "user" } // Add this field
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
