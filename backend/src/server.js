import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.routes.js";
import {connectDB} from './lib/db.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js'
import chatRoutes from './routes/chat.routes.js'


dotenv.config();
const app =  express();
app.use(cookieParser());
const PORT = process.env.PORT || 5001;


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
app.use("/api/chats",chatRoutes);


app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT} http://localhost:${PORT}`);

  connectDB();
});