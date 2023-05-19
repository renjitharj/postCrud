const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter  the name"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: true,
      lowercase: true,
      match: /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm,
    },
    phone: {
      type: String,
      match: /^(\+\d{1,3}[- ]?)?\d{10}$/,
      unique: true,
      required: [true],
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

module.exports = mongoose.model("User", UserSchema);

