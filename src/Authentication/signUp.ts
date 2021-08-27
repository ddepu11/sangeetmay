import { auth } from '../config/firebase';
import { sendNotification } from '../features/notification';
import { ICredentials } from '../interfaces';
import { useAppDispatch } from '../redux/hooks';

const customSignUp = async (credentials: ICredentials) => {
  const {
    firstName,
    lastName,
    email,
    age,
    gender,
    country,
    password,
    confirmPassword,
  } = credentials;

  try {
    const userCred = await auth.createUserWithEmailAndPassword(
      email.trim(),
      password.trim()
    );

    console.log(userCred.credential);
  } catch (err) {
    // dispatch(sendNotification(err.message));
    console.log(err);
  }
};

export { customSignUp };
