import { Router } from 'express';
import { getChatsIDsByUser, getChatByID } from '../firestoreFunctions';

const router = Router();

router.get('/', (req, res) => {
	res.send('hi');
});

router.get('/chats/:chatID', async (req, res) => {
	// try {
	res.status(200).json(await getChatByID(req.params.chatID));
	// } catch (error) {
	// res.status(500).send(error.message);
	// }
});

router.get('/chats/users/:userID', async (req, res) => {
	res.status(200).json(await getChatsIDsByUser(req.params.userID));
});

export default router;
