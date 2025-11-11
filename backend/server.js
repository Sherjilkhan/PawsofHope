require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const petsRoutes = require('./routes/pets');
const adoptionsRoutes = require('./routes/adoptions');
const userRoutes = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pawfecthome';

mongoose.connect(MONGO_URI) 
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

app.use('/api/pets', petsRoutes);
app.use('/api/adoptions', adoptionsRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('PawfectHome API running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
