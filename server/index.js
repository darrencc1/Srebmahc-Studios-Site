require('dotenv').config(); // Load .env first

const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const path = require('path');

// ✅ Image generation route
const imageRoutes = require('./routes/image');

const serviceAccount = require(path.resolve(process.env.FIREBASE_ADMIN_SDK_PATH));
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Add your proxy route
app.use('/api/image', imageRoutes);

// 🔁 Test backend root route
app.get('/', (req, res) => {
    console.log('GET / route was hit');
    res.send('Welcome to Srebmahc Studios from the backend!');
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
