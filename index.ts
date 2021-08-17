import express from 'express';
// import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
// import messageRouter from './routes/message';
// import messageIOHandler from './socketHandlers/message';
// import 'firebase/firestore';

// App setup
const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(messageRouter);
app.use(cors({ origin: ['http://localhost:3000'].concat([process.env.CORS_ORIGIN as string]) }));

const server = app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
	console.log('hi');
	res.send('hi');
});

// Socket setup
// const io = new Server(server, {
// cors: { origin: [''].concat([process.env.CORS_ORIGIN as string]) },
// });

// io.on('connection', (socket) => {
// messageIOHandler(io, socket);
// });
