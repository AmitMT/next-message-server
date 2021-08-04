import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
	console.log('Hi');
	res.status(200).send('Hi');
});

export default router;
