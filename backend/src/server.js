import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.routes.js";
import {connectDB} from './lib/db.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js'
import chatRoutes from './routes/chat.routes.js'
import cors from 'cors';


dotenv.config();
const app =  express();
app.use(cookieParser());
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


// app.get('/api/auth/singup', (req, res) => {
//   res.send('singup route');
// });

// app.get('/api/auth/login', (req, res) => {
//   res.send('login route');
// });
//  app.get('/api/auth/logout', (req, res) => {
//   res.send('logout route');
// });

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/chat",chatRoutes);


app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT} http://localhost:${PORT}`);

  connectDB();
});

console.log("PORT:", process.env.PORT);
console.log("MONGO_URI startsWith:", process.env.MONGO_URI?.slice(0, 30));
console.log("STEAM_API_KEY:", !!process.env.STEAM_API_KEY);
console.log("STEAM_API_KEY:", !!process.env.STEAM_API_KEY);
console.log("JWT_SECRET present:", !!process.env.JWT_SECRET);

