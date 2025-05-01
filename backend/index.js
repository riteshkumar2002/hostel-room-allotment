// index.js
import express from 'express';
import mongoose from 'mongoose';
import adminRoutes from './routers/admin.js';
// import userRoutes from './routers/user.js';

const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb://0.0.0.0:27017/hostle_allotment', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Database connection is successful");
}).catch((err) => {
  console.log("Database connection failed: " + err);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/admin', adminRoutes);
// app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
