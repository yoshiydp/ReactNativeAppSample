import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { firebaseAuth } from 'src/config/firebase';
import auth from '@react-native-firebase/auth';

// Store
import { subscribe } from 'src/store/SubscribeSlice';

// env
import { WEB_CLIENT_ID } from '@env';

// Components
import IntroMessage from 'src/components/molecules/IntroMessage';
import FormControls from 'src/components/templates/FormControls';
import SocialSignIn from 'src/components/organisms/SocialSignIn';
import Button from 'src/components/atoms/Button';

// Constants
import * as COLOR from 'constants/color';
import * as SVGPATH from 'constants/svgPath';
import * as TEXT from 'constants/text';

// Validators
import {
  validateEmail,
  validatePassword,
  validateUserNotFound,
  validateNetworkRequestFailed,
  validateTooManyRequests
} from 'src/validators/LoginValidator';

// Styles
import styles from './Login.scss';

interface Props {
  navigation: any;
}

let user: any = null;

const Login = (props: Props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');
  const [credentialStateForUser, updateCredentialStateForUser] = useState<number>(-1);

  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  });

  useEffect(() => {
    if (!appleAuth.isSupported) return;
    return appleAuth.onCredentialRevoked(async () => {
      console.warn('Credential Revoked');
      fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
        updateCredentialStateForUser(error.code),
      );
    });
  }, []);

  const signIn = async () => {
    setErrorEmail('');
    setErrorPassword('');
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      console.log(firebaseAuth.currentUser?.photoURL);
      console.log(firebaseAuth.currentUser?.displayName);
      console.log(firebaseAuth.currentUser?.email);
      console.log(firebaseAuth.currentUser?.photoURL);
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') {
        validateEmail(email, setErrorEmail);
        validatePassword(password, setErrorPassword);
      }
      if (error.code === 'auth/wrong-password') {
        validatePassword(password, setErrorPassword);
      }
      if (error.code === 'auth/internal-error') {
        validateEmail(email, setErrorEmail);
        validatePassword(password, setErrorPassword);
      }
      if (error.code === 'auth/user-not-found') {
        validateUserNotFound(setErrorEmail, password, setErrorPassword);
      }
      if (error.code === 'auth/network-request-failed') {
        validateNetworkRequestFailed(setErrorEmail, setErrorPassword);
      }
      if (error.code === 'auth/too-many-requests') {
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
        throw new Error('Apple Sign-In failed - no identify token returned');
      }
      const { identityToken, nonce } = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
      dispatch(subscribe());
      return auth().signInWithCredential(appleCredential);
    } catch (error: any) {
      console.log(error, error.code);
    }
  }

  const fetchAndUpdateCredentialState = async (updateCredentialStateForUser: any) => {
    if (user === null) {
      updateCredentialStateForUser('N/A');
    } else {
      const credentialState = await appleAuth.getCredentialStateForUser(user);
      if (credentialState === appleAuth.State.AUTHORIZED) {
        updateCredentialStateForUser('AUTHORIZED');
      } else {
        updateCredentialStateForUser(credentialState);
      }
    }
  }

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      dispatch(subscribe());
      return auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      console.log(error, error.code);
    }
  }

  // テキストフォームリスト
  const inputFieldItems = [
    {
      label: TEXT.LABEL_INPUT_EMAIL,
      placeholder: TEXT.PLACEHOLDER_INPUT_EMAIL,
      onChangeText: setEmail,
      value: email,
      required: true,
      errorText: errorEmail
    },
    {
      label: TEXT.LABEL_INPUT_PASSWORD,
      placeholder: TEXT.PLACEHOLDER_INPUT_PASSWORD,
      onChangeText: setPassword,
      value: password,
      secureText: true,
      required: true,
      errorText: errorPassword
    }
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
      onPressEvent: signInWithApple
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
      onPressEvent: signInWithGoogle
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <IntroMessage />
      <FormControls
        inputFieldItems={ inputFieldItems }
        submitText={ TEXT.BUTTON_SIGN_IN }
        submitEvent={ signIn }
      />
      <Text style={styles.forgotMessagge}>
        パスワードをお忘れの場合は
        <Text
          style={ styles.linkText }
          onPress={() => props.navigation.navigate('PasswordReset')}>
          こちら
        </Text>
        から
      </Text>
      <SocialSignIn
        title={ TEXT.TEXT_SIGN_IN_WITH }
        socialIconItems={ socialIconItems }
      />
      <View style={ styles.signUpWrap }>
        <Text style={ styles.signUpMessage }>
          まだアカウントを作成していない場合は下のボタンから
        </Text>
        <View style={ styles.signUpButtonWrap }>
          <Button
            text={ TEXT.BUTTON_NEW_ACCOUNT_CREATE }
            onPressEvent={() => props.navigation.navigate('SignUp')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
