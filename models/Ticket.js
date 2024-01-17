const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  severity: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SupportAgent",
  },
  status: {
    type: String,
    enum: ["New", "Assigned", "Resolved"],
    required: true,
  },
  resolvedOn: {
    type: Date,
  },
});

const SupportTicket = mongoose.model("SupportTicket", ticketSchema);

module.exports = SupportTicket;
