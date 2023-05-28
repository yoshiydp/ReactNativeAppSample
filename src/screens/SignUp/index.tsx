import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { firebaseAuth, db } from "src/config/firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import auth from "@react-native-firebase/auth";

// Store
import { subscribe } from "store/SubscribeSlice";

// env
import { WEB_CLIENT_ID } from "@env";

// Components
import IntroMessage from "components/molecules/IntroMessage";
import AuthForm from "components/templates/AuthForm";
import SocialSignIn from "components/organisms/SocialSignIn";

// Constants
import * as COLOR from "constants/color";
import * as SVGPATH from "constants/svgPath";
import * as TEXT from "constants/text";

// Validators
import {
  validateUserName,
  validateEmail,
  validatePassword,
  validateNetworkRequestFailed,
  validateTooManyRequests,
} from "src/validators/SignUpValidator";

// Styles
import styles from "./SignUp.scss";

interface Props {
  navigation: any;
}

const user: any = null;

const SignUp = (props: Props) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorUserName, setErrorUserName] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [credentialStateForUser, updateCredentialStateForUser] = useState<number>(-1);

  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  });

  const signUp = async () => {
    setErrorUserName("");
    setErrorEmail("");
    setErrorPassword("");
    try {
      const { user } = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const docRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(docRef);
      await updateProfile(user, {
        displayName: userName,
      });
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          displayName: userName,
          myProjectsData: [],
          trackListData: [],
          createdAt: serverTimestamp(),
          deletedAt: null,
        });
      }
    } catch (error: any) {
      if (error.code === "auth/missing-email") {
        validateUserName(userName, setErrorUserName);
        validateEmail(email, setErrorEmail);
        validatePassword(password, setErrorPassword);
      }
      if (error.code === "auth/weak-password") {
        validateUserName(userName, setErrorUserName);
        validateEmail(email, setErrorEmail);
        validatePassword(password, setErrorPassword);
      }
      if (error.code === "auth/invalid-email") {
        validateUserName(userName, setErrorUserName);
        validateEmail(email, setErrorEmail);
        validatePassword(password, setErrorPassword);
      }
      if (error.code === "auth/wrong-password") {
        validatePassword(password, setErrorPassword);
      }
      if (error.code === "auth/internal-error") {
        validateEmail(email, setErrorEmail);
        validatePassword(password, setErrorPassword);
      }
      if (error.code === "auth/network-request-failed") {
        validateNetworkRequestFailed(setErrorEmail, setErrorPassword);
      }
      if (error.code === "auth/too-many-requests") {
        validateTooManyRequests(setErrorEmail, setErrorPassword);
      }
      console.log(error.code);
    }
  };

  const signInWithApple = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      if (!appleAuthRequestResponse.identityToken) {
        throw new Error("Apple Sign-In failed - no identify token returned");
      }
      const { identityToken, nonce } = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
      dispatch(subscribe());
      return await auth().signInWithCredential(appleCredential);
    } catch (error: any) {
      console.log(error, error.code);
    }
  };

  const fetchAndUpdateCredentialState = async (updateCredentialStateForUser: any) => {
    if (user === null) {
      updateCredentialStateForUser("N/A");
    } else {
      const credentialState = await appleAuth.getCredentialStateForUser(user);
      if (credentialState === appleAuth.State.AUTHORIZED) {
        updateCredentialStateForUser("AUTHORIZED");
      } else {
        updateCredentialStateForUser(credentialState);
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      dispatch(subscribe());
      return await auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      console.log(error, error.code);
    }
  };

  useEffect(() => {
    if (!appleAuth.isSupported) return;
    return appleAuth.onCredentialRevoked(() => {
      console.warn("Credential Revoked");
      fetchAndUpdateCredentialState(updateCredentialStateForUser).catch((error) =>
        updateCredentialStateForUser(error.code)
      );
    });
  }, []);

  // テキストフォームリスト
  const formControlItems = [
    {
      label: TEXT.LABEL_INPUT_USERNAME,
      placeholder: TEXT.PLACEHOLDER_INPUT_USERNAME,
      onChangeText: setUserName,
      value: userName,
      required: true,
      notes: TEXT.LABEL_NOTES_USERNAME,
      errorText: errorUserName,
    },
    {
      label: TEXT.LABEL_INPUT_EMAIL,
      placeholder: TEXT.PLACEHOLDER_INPUT_EMAIL,
      onChangeText: setEmail,
      value: email,
      required: true,
      notes: TEXT.LABEL_NOTES_EMAIL,
      errorText: errorEmail,
    },
    {
      label: TEXT.LABEL_INPUT_PASSWORD,
      placeholder: TEXT.PLACEHOLDER_INPUT_PASSWORD,
      onChangeText: setPassword,
      value: password,
      secureText: true,
      required: true,
      notes: TEXT.LABEL_NOTES_PASSWORD,
      errorText: errorPassword,
    },
  ];

  // ソーシャルアイコンリスト
  const socialIconItems = [
    {
      svgType: 1,
      width: "15",
      height: "19",
      viewBox: "0 0 15 19",
      pathD1: SVGPATH.ICON_APPLE,
      pathTransform1: "translate(-20.5 -16)",
      pathFill: COLOR.COLOR_BLACK_BASE,
      onPressEvent: signInWithApple,
    },
    {
      svgType: 5,
      width: "18",
      height: "18",
      viewBox: "0 0 18 18",
      pathD1: SVGPATH.ICON_GOOGLE_PATH1,
      pathD2: SVGPATH.ICON_GOOGLE_PATH2,
      pathD3: SVGPATH.ICON_GOOGLE_PATH3,
      pathD4: SVGPATH.ICON_GOOGLE_PATH4,
      pathD5: SVGPATH.ICON_GOOGLE_PATH5,
      pathFill1: "#4285f4",
      pathFill2: "#34a853",
      pathFill3: "#fbbc05",
      pathFill4: "#ea4335",
      pathFill5: "none",
      fillRule: "evenodd",
      onPressEvent: signInWithGoogle,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <IntroMessage message={TEXT.TEXT_INTRO_MESSAGE} />
        <AuthForm
          formControlItems={formControlItems}
          buttonText={TEXT.BUTTON_SIGN_UP}
          submitEvent={signUp}
        />
        <SocialSignIn title={TEXT.TEXT_SIGN_UP_WITH} socialIconItems={socialIconItems} />
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUp;
