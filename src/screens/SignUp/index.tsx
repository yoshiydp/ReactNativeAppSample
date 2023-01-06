import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { firebaseAuth } from '../../config/firebase';
import auth from '@react-native-firebase/auth';

// Store
import { subscribe } from 'src/store/SubscribeSlice';

// env
import { WEB_CLIENT_ID } from '@env';

// Components
import IntroMessage from 'src/components/molecules/IntroMessage';
import AuthForm from 'src/components/templates/AuthForm';
import SocialSignIn from 'src/components/organisms/SocialSignIn';

// Constants
import * as COLOR from 'constants/color';
import * as SVGPATH from 'constants/svgPath';
import * as TEXT from 'constants/text';

// Styles
import styles from './SignUp.scss';

interface Props {
  navigation: any;
}

const SignUp = (props: Props) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  });

  useEffect(() => {
  }, []);

  const signUp = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      await updateProfile(user, {
        displayName: userName
      });
      console.log(user.displayName);
    } catch (error: any) {
      console.log(error.message);
    }
  };

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

  const onPressEvent1 = () => {
    console.log('onpress: onPressEvent1');
  }

  // テキストフォームリスト
  const inputFieldItems = [
    {
      label: TEXT.LABEL_INPUT_USERNAME,
      placeholder: TEXT.PLACEHOLDER_INPUT_USERNAME,
      onChangeText: setUserName,
      value: userName,
      required: true
    },
    {
      label: TEXT.LABEL_INPUT_EMAIL,
      placeholder: TEXT.PLACEHOLDER_INPUT_EMAIL,
      onChangeText: setEmail,
      value: email,
      required: true
    },
    {
      label: TEXT.LABEL_INPUT_PASSWORD,
      placeholder: TEXT.PLACEHOLDER_INPUT_PASSWORD,
      onChangeText: setPassword,
      value: password,
      secureText: true,
      required: true
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
      onPressEvent: onPressEvent1
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
    <View style={styles.container}>
      <IntroMessage
        message={ TEXT.TEXT_INTRO_MESSAGE }
      />
      <AuthForm
        inputFieldItems={ inputFieldItems }
        submitText={ TEXT.BUTTON_SIGN_UP }
        submitEvent={ signUp }
      />
      <SocialSignIn
        title={ TEXT.TEXT_SIGN_UP_WITH }
        socialIconItems={ socialIconItems }
      />
      {/* <KeyboardAvoidingView
        behavior="padding"
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 20, marginBottom: 20 }}>ユーザ登録画面</Text>
        <View style={{ marginBottom: 20 }}>
          <TextInput
            style={{
              width: 250,
              borderWidth: 1,
              padding: 5,
              borderColor: 'gray',
              backgroundColor: 'white'
            }}
            onChangeText={setUserName}
            value={userName}
            placeholder="ユーザー名を入力してください"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <TextInput
            style={{
              width: 250,
              borderWidth: 1,
              padding: 5,
              borderColor: 'gray',
              backgroundColor: 'white'
            }}
            onChangeText={setEmail}
            value={email}
            placeholder="メールアドレスを入力してください"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <TextInput
            style={{
              width: 250,
              borderWidth: 1,
              padding: 5,
              borderColor: 'gray',
              backgroundColor: 'white'
            }}
            onChangeText={setPassword}
            value={password}
            placeholder="パスワードを入力してください"
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: '#88cb7f',
            borderRadius: 10,
          }}
          onPress={signUp}
          // disabled={!email || !password}
        >
          <Text style={{ color: 'white' }}>登録する</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView> */}
    </View>
  );
};

export default SignUp;
