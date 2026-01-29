const express = require('express');
const axios = require('axios');
const router = express.Router();


router.get('/', async (req, res) => {
 try {
    const response = await axios.get('https://dummyjson.com/products');

    res.status(200).json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('Error fetching products:', error.message);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    });
  }
});


router.get('/search', async (req, res) => {

  const query = req.query.q;

  try {
    const response = await axios.get(
        `https://dummyjson.com/products/search?q=${query}`
    );
  res.status(200).json({
      success: true,
      data: response.data
    });
  } 
  catch (error) {
    res.status(500).json({ message: 'Search failed' });
  }
});

module.exports = router;

