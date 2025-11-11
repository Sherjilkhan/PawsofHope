const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const adminAuth = require('../middleware/adminAuth');

// GET all pets
router.get('/', async (req, res) => {
  try {
    const { species, search } = req.query;
    const filter = {};
    if (species) filter.species = species;
    if (search) filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { breed: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
    const pets = await Pet.find(filter).sort({ createdAt: -1 });
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single pet
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add new pet (admin)
router.post('/', adminAuth, async (req, res) => {
  try {
    const p = new Pet(req.body);
    const saved = await p.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update pet (admin)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const updated = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE pet (admin)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pet deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
