// index.js
import express from 'express';
import adminRoutes from './routers/admin.js';
import "./config/database.mjs";
// import userRoutes from './routers/user.js';

const app = express();
const port = 3000;

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/admin', adminRoutes);
// app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
