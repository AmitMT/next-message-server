import { Server, Socket } from 'socket.io';
import { getChatByID, getChatsIDsByUser } from '../firestoreFunctions';

export let userIDs: { socketID: string; userID: string }[] = [];

export default (io: Server, socket: Socket) => {
	console.log('New connection - "' + socket.id + '"');

	socket.on('userID', async (userID) => {
		userIDs.push({ socketID: socket.id, userID: userID });
		const chatData = await Promise.all(
			(await getChatsIDsByUser(userID)).map((chatID) => getChatByID(chatID))
		);

		socket.emit('chatsData', chatData);
	});

	socket.on('disconnect', () => {
		console.log('New disconnection - "' + socket.id + '"');
		userIDs = userIDs.filter((userID) => userID.socketID !== socket.id);
	});
};
