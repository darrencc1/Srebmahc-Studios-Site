const express = require('express');
const router = express.Router();
const axios = require('axios');
//I need the real URL from ngrok and I need to get the api key. 
const COLAB_URL = "https://<your-ngrok-url>"; 
router.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await axios.post(`${COLAB_URL}/generate`, { prompt });
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Image generation failed");
  }
});

module.exports = router;