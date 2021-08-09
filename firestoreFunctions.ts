import firebase from 'firebase';
import { db } from './firebase';

export const getChatsIDsByUser = async (userID: string) => {
	const chatsCol = db.collection('chats');
	const chatsDocs = (await chatsCol.get()).docs;
	const chatsDocsIDs = chatsDocs.map((chatsDoc) => chatsDoc.id);
	const membersCols = chatsDocs.map((doc) => doc.ref.collection('members'));
	const membersDocs = await Promise.all(
		membersCols.map(async (membersCollection) => (await membersCollection.get()).docs)
	);

	const membersDocsData = membersDocs.map((memberDocs) =>
		memberDocs.map((memberDoc) => memberDoc.data())
	);

	const usersIDs = membersDocsData.map((memberDocsData) =>
		memberDocsData.map((memberDocData) => memberDocData?.user?.id as string | undefined)
	);
	const indexesOfChatsDocs: number[] = [];
	for (let i = 0; i < usersIDs.length; i++)
		if (usersIDs[i].includes(userID)) indexesOfChatsDocs.push(i);

	const chatsDocsIDsWithUser: string[] = new Array(indexesOfChatsDocs.length);
	for (let i = 0; i < indexesOfChatsDocs.length; i++)
		chatsDocsIDsWithUser[i] = chatsDocsIDs[indexesOfChatsDocs[i]];

	return chatsDocsIDsWithUser;
};

export const getChatByID = async (chatID: string) => {
	const chatsCol = db.collection('chats');
	const chatsDoc = await chatsCol.doc(chatID).get();

	const membersCol = chatsDoc.ref.collection('members');
	const membersDocsData = (await membersCol.get()).docs.map((membersDoc) => membersDoc.data());

	const members = await Promise.all(
		membersDocsData.map(async (membersDocData) =>
			membersDocData.user
				? (await (membersDocData.user as firebase.firestore.DocumentReference).get()).data()
				: {}
		)
	);
	const chatName = chatsDoc.data()?.name as string | undefined;

	const messagesCol = chatsDoc.ref.collection('messages');
	const lastMessage = (await messagesCol.orderBy('timestamp').limit(1).get()).docs[0]?.data();
	if (lastMessage?.user)
		lastMessage.user = (
			await (lastMessage.user as firebase.firestore.DocumentReference).get()
		).data();
	return { id: chatID, name: chatName, members, lastMessage };

	// const messagesDocsData = (await messagesCol.get()).docs.map((membersDoc) => membersDoc.data());
	// for (const messagesDocData of messagesDocsData) {
	// 	if (messagesDocData.user)
	// 		messagesDocData.user = (
	// 			await (messagesDocData.user as firebase.firestore.DocumentReference).get()
	// 		).data();
	// }
};

getChatByID('mnhfA6PTGiG3QM9kKCew').then(console.log);
