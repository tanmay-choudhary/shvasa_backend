const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const Agent = require("../models/Agent");
let currentAgentIndex = 0;
router.get("/get-tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/get-tickets", async (req, res) => {
  try {
    const filters = req.body;
    const query = {};

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.assignedTo) {
      query.assignedTo = filters.assignedTo;
    }

    if (filters.severity) {
      query.severity = filters.severity;
    }

    if (filters.type) {
      query.type = filters.type;
    }

    let sortOption = {};
    if (filters.sortField) {
      sortOption[filters.sortField] = 1;
    }

    const tickets = await Ticket.find(query).sort(sortOption);
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

async function getNextAvailableAgent() {
  const agents = await Agent.find({ active: true });
  if (agents.length === 0) {
    throw new Error("No active support agents available");
  }

  const nextAgent = agents[currentAgentIndex];
  currentAgentIndex = (currentAgentIndex + 1) % agents.length;
  return { assignedAgentId: nextAgent._id, agent: nextAgent };
}

router.post("/support-tickets", async (req, res) => {
  try {
    const newTicket = await Ticket.create({
      ...req.body,
      status: "New",
    });

    res.status(201).json(newTicket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/assign-tickets", async (req, res) => {
  try {
    const ticketId = req.body.ticketId;
    const { assignedAgentId, agent } = await getNextAvailableAgent();

    const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, {
      assignedTo: assignedAgentId,
      status: "Assigned",
    });

    res.status(200).json(agent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/update-tickets", async (req, res) => {
  try {
    const ticketId = req.body.ticketId;

    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,

      { status: "Resolved" }
    );

    res.status(200).json(updatedTicket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete-tickets", async (req, res) => {
  try {
    await Ticket.deleteMany({});
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
