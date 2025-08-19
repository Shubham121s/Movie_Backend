require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');


const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/movies', movieRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
