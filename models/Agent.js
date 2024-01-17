const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
});

const SupportAgent = mongoose.model("SupportAgent", agentSchema);

module.exports = SupportAgent;
