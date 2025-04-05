import { db } from '../../../firebase';
import { collection, query, where, getDocs, addDoc, updateDoc } from 'firebase/firestore';

const SCORES_COLLECTION = "highscores_BoxDodger";

export const saveScore = async (name, score) => {
  try {
    const scoresRef = collection(db, SCORES_COLLECTION);
    const q = query(scoresRef, where("name", "==", name));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, { score });
      console.log("Score updated!");
    } else {
      await addDoc(scoresRef, { name, score });
      console.log("New score added!");
    }
  } catch (error) {
    console.error("Error saving score:", error);
  }
};
