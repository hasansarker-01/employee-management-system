const express = require('express');
const mongoose = require('mongoose');
const dns = require('dns');
const cors = require('cors');
require('dotenv').config();

dns.setServers(['8.8.8.8', '1.1.1.1']);
dns.setDefaultResultOrder('ipv4first');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const employeeRoutes = require('./routes/employeeRoutes');

// Attendance routes
const attendanceRoutes = require('./routes/attendanceRoutes');

app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);

app.use('/api/employees', employeeRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
  });

app.get('/', (req, res) => {
  res.send('Employee Management API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
