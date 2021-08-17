"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessagesByChatID = exports.getChatByID = exports.getChatsIDsByUser = void 0;
var firebase_1 = require("./firebase");
var getChatsIDsByUser = function (userID) { return __awaiter(void 0, void 0, void 0, function () {
    var chatsCol, chatsDocs, chatsDocsIDs, membersCols, membersDocs, membersDocsData, usersIDs, indexesOfChatsDocs, i, chatsDocsIDsWithUser, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                chatsCol = firebase_1.db.collection('chats');
                return [4 /*yield*/, chatsCol.get()];
            case 1:
                chatsDocs = (_a.sent()).docs;
                chatsDocsIDs = chatsDocs.map(function (chatsDoc) { return chatsDoc.id; });
                membersCols = chatsDocs.map(function (doc) { return doc.ref.collection('members'); });
                return [4 /*yield*/, Promise.all(membersCols.map(function (membersCollection) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, membersCollection.get()];
                            case 1: return [2 /*return*/, (_a.sent()).docs];
                        }
                    }); }); }))];
            case 2:
                membersDocs = _a.sent();
                membersDocsData = membersDocs.map(function (memberDocs) {
                    return memberDocs.map(function (memberDoc) { return memberDoc.data(); });
                });
                usersIDs = membersDocsData.map(function (memberDocsData) {
                    return memberDocsData.map(function (memberDocData) { var _a; return (_a = memberDocData === null || memberDocData === void 0 ? void 0 : memberDocData.user) === null || _a === void 0 ? void 0 : _a.id; });
                });
                indexesOfChatsDocs = [];
                for (i = 0; i < usersIDs.length; i++)
                    if (usersIDs[i].includes(userID))
                        indexesOfChatsDocs.push(i);
                chatsDocsIDsWithUser = new Array(indexesOfChatsDocs.length);
                for (i = 0; i < indexesOfChatsDocs.length; i++)
                    chatsDocsIDsWithUser[i] = chatsDocsIDs[indexesOfChatsDocs[i]];
                return [2 /*return*/, chatsDocsIDsWithUser];
        }
    });
}); };
exports.getChatsIDsByUser = getChatsIDsByUser;
var getChatByID = function (chatID) { return __awaiter(void 0, void 0, void 0, function () {
    var chatsCol, chatsDoc, membersCol, membersDocsData, members, chatName, messagesCol, lastMessage, _a;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                chatsCol = firebase_1.db.collection('chats');
                return [4 /*yield*/, chatsCol.doc(chatID).get()];
            case 1:
                chatsDoc = _d.sent();
                membersCol = chatsDoc.ref.collection('members');
                return [4 /*yield*/, membersCol.get()];
            case 2:
                membersDocsData = (_d.sent()).docs.map(function (membersDoc) { return membersDoc.data(); });
                return [4 /*yield*/, Promise.all(membersDocsData.map(function (membersDocData) { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!membersDocData.user) return [3 /*break*/, 2];
                                    return [4 /*yield*/, membersDocData.user.get()];
                                case 1:
                                    _a = (_b.sent()).data();
                                    return [3 /*break*/, 3];
                                case 2:
                                    _a = {};
                                    _b.label = 3;
                                case 3: return [2 /*return*/, _a];
                            }
                        });
                    }); }))];
            case 3:
                members = _d.sent();
                chatName = (_b = chatsDoc.data()) === null || _b === void 0 ? void 0 : _b.name;
                messagesCol = chatsDoc.ref.collection('messages');
                return [4 /*yield*/, messagesCol.orderBy('timestamp').limit(1).get()];
            case 4:
                lastMessage = (_c = (_d.sent()).docs[0]) === null || _c === void 0 ? void 0 : _c.data();
                if (!(lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.user)) return [3 /*break*/, 6];
                _a = lastMessage;
                return [4 /*yield*/, lastMessage.user.get()];
            case 5:
                _a.user = (_d.sent()).data();
                _d.label = 6;
            case 6: return [2 /*return*/, { id: chatID, name: chatName, members: members, lastMessage: lastMessage }];
        }
    });
}); };
exports.getChatByID = getChatByID;
var getMessagesByChatID = function (chatID) { return __awaiter(void 0, void 0, void 0, function () {
    var chatsCol, chatsDoc, messagesCol, messagesDocsData, _i, messagesDocsData_1, messagesDocData, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                chatsCol = firebase_1.db.collection('chats');
                return [4 /*yield*/, chatsCol.doc(chatID).get()];
            case 1:
                chatsDoc = _b.sent();
                messagesCol = chatsDoc.ref.collection('messages');
                return [4 /*yield*/, messagesCol.orderBy('timestamp').get()];
            case 2:
                messagesDocsData = (_b.sent()).docs.map(function (membersDoc) {
                    return membersDoc.data();
                });
                _i = 0, messagesDocsData_1 = messagesDocsData;
                _b.label = 3;
            case 3:
                if (!(_i < messagesDocsData_1.length)) return [3 /*break*/, 6];
                messagesDocData = messagesDocsData_1[_i];
                if (!messagesDocData.user) return [3 /*break*/, 5];
                _a = messagesDocData;
                return [4 /*yield*/, messagesDocData.user.get()];
            case 4:
                _a.user = (_b.sent()).data();
                _b.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6: return [2 /*return*/, messagesDocsData];
        }
    });
}); };
exports.getMessagesByChatID = getMessagesByChatID;
// getMessagesByChatID('mnhfA6PTGiG3QM9kKCew').then(console.log);
