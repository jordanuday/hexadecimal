const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle JSON data
app.use(express.json());

// Endpoint to fetch users and posts and combine them
app.get('/v1/users', async (req, res) => {
  try {
    const users = await axios.get('https://jsonplaceholder.typicode.com/users');
    const posts = await axios.get('https://jsonplaceholder.typicode.com/posts');

    const combinedData = users.data.map(user => ({
      ...user,
      posts: posts.data.filter(post => post.userId === user.id)
    }));

    res.json(combinedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to search users by name
app.get('/v1/users', async (req, res) => {
  const searchText = req.query.searchText;

  if (!searchText) {
    return res.status(400).json({ error: 'Please provide searchText parameter' });
  }

  try {
    const users = await axios.get('https://jsonplaceholder.typicode.com/users');

    const matchingUsers = users.data.filter(user =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );

    res.json(matchingUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
