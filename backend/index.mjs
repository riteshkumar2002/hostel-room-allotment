// index.js
import express from 'express';
import "./config/database.mjs";
import routes from "./routes/index.mjs";
// import userRoutes from './routers/user.js';

const app = express();
const port = 5000;

app.use(routes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
