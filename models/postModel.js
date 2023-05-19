const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    name: {
      type: String,
      required: [true, "Please enter  the name"],
    },
    description: {
      type: String,
      required: [true, "Please enter  the description"],
    },
    file: {
      type: String,
    },
    filename:
        {type:String},
    
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

module.exports = mongoose.model("Post", PostSchema);
