const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

// ***NGROK URL WILL CHANGE EVERYTIME RUNTIME IS CHANGED,****
//IMPROVE this later when releasing/hosting website
const COLAB_URL = "https://0d6b-34-143-238-210.ngrok-free.app";

router.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(`${COLAB_URL}/generate`, { prompt });
    res.json(response.data); // { image_base64: "..." }

  } catch (err) {
    console.error("Error generating image:", err.message);
    res.status(500).json({ error: "Image generation failed" });
  }
});

module.exports = router;
