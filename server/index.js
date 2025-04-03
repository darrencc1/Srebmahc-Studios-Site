require('dotenv').config(); //This will load .env file first

const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const path = require('path');

const serviceAccount = require(path.resolve(process.env.FIREBASE_ADMIN_SDK_PATH));
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const app = express();
app.use(cors()); // Allow requests from frontend
app.use(express.json());

// Simple backend route
app.get('/', (req, res) => {
    console.log('GET / route was hit');
    res.send('Welcome to Srebmahc Studios from the backend!');
  });
  

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
