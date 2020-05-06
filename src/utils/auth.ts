import firebase from "firebase/app";
import { app } from "../firebaseConfig";

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await firebase
      .auth(app)
      .signInWithEmailAndPassword(email, password);
    return res;
  } catch (error) {
    return error;
  }
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const res = await firebase
      .auth(app)
      .createUserWithEmailAndPassword(email, password);
    await res.user?.updateProfile({
      displayName: username,
    });
    return res;
  } catch (error) {
    return error;
  }
};
