const mongoose = require("mongoose");

const inputSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
  },
  type: {
    type: String,
    enum: ["text", "number", "email", "password", "date"],
    required: true,
  },
});

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  inputs: [inputSchema],
});

module.exports = mongoose.model("Form", formSchema);
