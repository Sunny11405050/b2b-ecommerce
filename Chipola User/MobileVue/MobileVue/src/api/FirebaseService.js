import { firebaseDb, firebaseCollectionEnum } from "src/boot/FirebaseChat";
import APIinterface from "src/api/APIinterface";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";

const FirebaseService = {
  async createChatOrder(orderID, orderUUID, MerchantUUID, UserUUID) {
    let myPromise = new Promise(async function (resolve, reject) {
      try {
        const data = {
          lastUpdated: serverTimestamp(),
          dateCreated: serverTimestamp(),
          orderID: orderID,
          orderUuid: orderUUID,
          participants: [MerchantUUID, UserUUID],
          isTyping: {
            [`${MerchantUUID}`]: false,
            [`${UserUUID}`]: false,
          },
        };
        await setDoc(
          doc(firebaseDb, firebaseCollectionEnum.chats, orderUUID),
          data
        );
        resolve(orderUUID);
      } catch (error) {
        reject(error);
      }
    });
    return await myPromise;
  },
  async createChat(fromUserId, toUserId) {
    let myPromise = new Promise(async function (resolve, reject) {
      try {
        const collectionRef = collection(
          firebaseDb,
          firebaseCollectionEnum.chats
        );
        const q = query(
          collectionRef,
          where("participants", "array-contains", toUserId),
          orderBy("lastUpdated", "desc"),
          limit(1)
        );

        let documentId = "";
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          let participants = data.participants || null;
          if (participants.includes(fromUserId) === true) {
            documentId = doc.id;
          }
        });

        if (!APIinterface.empty(documentId)) {
          resolve(documentId);
        } else {
          // CREATE CONVERSATION
          const newConversationRef = await addDoc(
            collection(firebaseDb, firebaseCollectionEnum.chats),
            {
              lastUpdated: serverTimestamp(),
            }
          );
          const chatId = newConversationRef.id;
          const chatDocRef = doc(
            firebaseDb,
            firebaseCollectionEnum.chats,
            chatId
          );

          let data = {
            lastUpdated: serverTimestamp(),
            dateCreated: serverTimestamp(),
            participants: [toUserId, fromUserId],
            isTyping: {
              [`${toUserId}`]: false,
              [`${fromUserId}`]: false,
            },
          };

          setDoc(chatDocRef, data)
            .then(() => {
              resolve(chatId);
            })
            .catch((error) => {
              reject(error);
            });
        }
      } catch (error) {
        reject(error);
      }
    });
    return await myPromise;
  },
};
export default FirebaseService;
