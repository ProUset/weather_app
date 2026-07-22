const express = require('express');
const cors = require('cors');
const { port } = require('./config/env');
const weatherRoutes = require('./routes/weatherRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/weather', weatherRoutes);

app.use((err, req, res, next) => {
  console.error(err?.response?.data || err.message || err);
  const status = err?.response?.status || 500;
  const message = err?.response?.data?.error?.message || err.message || 'Internal server error';
  res.status(status).json({ error: message });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
