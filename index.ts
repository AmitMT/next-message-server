import express from 'express';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import messageRouter from './routes/message';
import { db } from './firebase';

// App setup
const PORT = 5000;
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(messageRouter);

const server = app.listen(PORT, () => {
	console.log(`Listening on port ${PORT} (http://localhost:${PORT})`);
});

// Socket setup
const io = new Server(server);

io.on('connection', (socket) => {
	console.log('Made socket connection');
});
