const express = require("express");
const router = express.Router();
const Agent = require("../models/Agent");

router.get("/get-agents", async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/support-agents", async (req, res) => {
  try {
    const newAgent = await Agent.create(req.body);
    res.status(201).json(newAgent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete-agents", async (req, res) => {
  try {
    await Agent.deleteMany({});
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
