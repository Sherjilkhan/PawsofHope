const express = require('express');
const router = express.Router();
const AdoptionRequest = require('../models/AdoptionRequest');
const Pet = require('../models/Pet');
const adminAuth = require('../middleware/adminAuth');
const auth = require('../middleware/auth');

// POST submit adoption request (requires auth to attach userId)
router.post('/', auth, async (req, res) => {
  try {
    const { name, email, phone, address, reason, petId } = req.body;
    if (!name || !petId) return res.status(400).json({ message: 'Name and petId required' });

    await Pet.findByIdAndUpdate(petId, { adoptionStatus: 'pending' });

    const reqDoc = new AdoptionRequest({
      name, email, phone, address, reason, petId,
      userId: req.user ? req.user._id : undefined
    });
    const saved = await reqDoc.save();
    res.status(201).json({ message: 'Adoption request submitted', saved });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all adoption requests (admin)
router.get('/', adminAuth, async (req, res) => {
  try {
    const reqs = await AdoptionRequest.find().populate('petId').sort({ createdAt: -1 });
    res.json(reqs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET adoption history for logged-in user
router.get('/user', auth, async (req, res) => {
  try {
    const requests = await AdoptionRequest.find({ userId: req.user._id }).populate('petId');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
