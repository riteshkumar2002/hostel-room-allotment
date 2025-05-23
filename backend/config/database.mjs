import mongoose from 'mongoose';
import "dotenv/config";

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const name = "hostel-room-allotment";

const url = `mongodb+srv://${username}:${password}@cluster0.tvkfzug.mongodb.net/${name}?retryWrites=true&w=majority&appName=Cluster0`;
 
mongoose.connect(url).then(() => {
  console.log("database connection is successful");
}).catch((err) => {
  console.log("database connection failed!\n" + err);
});