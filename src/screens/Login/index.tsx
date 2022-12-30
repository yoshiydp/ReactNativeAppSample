import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

// Components
import IntroMessage from 'src/components/molecules/IntroMessage';
import AuthForm from 'src/components/templates/AuthForm';
import SocialSignIn from 'src/components/organisms/SocialSignIn';
import Button from 'src/components/atoms/Button';

// Constants
import * as COLOR from 'constants/color';
import * as SVGPATH from 'constants/svgPath';
import * as TEXT from 'constants/text';

// Styles
import styles from './Login.scss';

interface Props {
  navigation: any;
}

const Login = (props: Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const inputFieldItems = [
    {
      label: TEXT.LABEL_INPUT_USERNAME_EMAIL,
      placeholder: TEXT.PLACEHOLDER_INPUT_USERNAME_EMAIL,
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

  const socialItems = [
    {
      svgType: 1,
      width: "15",
      height: "19",
      viewBox: "0 0 15 19",
      pathD1: SVGPATH.ICON_APPLE,
      pathTransform1: "translate(-20.5 -16)",
      pathFill: COLOR.COLOR_BLACK_BASE,
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
    }
  ];

  useEffect(() => {
  }, []);

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log(auth.currentUser?.photoURL);
      console.log(auth.currentUser?.displayName);
      console.log(auth.currentUser?.email);
      console.log(auth.currentUser?.photoURL);
      
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') console.log('メールアドレスまたはユーザー名が間違っています');
      if (error.code === 'auth/wrong-password') console.log('パスワードが間違っています');
      if (error.code === 'auth/user-not-found') console.log('ユーザーが見つかりませんでした');
      if (error.code === 'auth/internal-error') console.log('パスワードが入力されていません');
      if (error.code === 'auth/network-request-failed') console.log('ネットワークへの接続が切れています');
      console.log(error.code);
    }
  };

  return (
    <View style={styles.container}>
      <IntroMessage />
      <AuthForm
        inputFieldItems={ inputFieldItems }
        submitText="ログイン"
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
        socialItems={ socialItems }
      />
      <View style={ styles.signUpWrap }>
        <Text style={ styles.signUpMessage }>
          まだアカウントを作成していない場合は下のボタンから
        </Text>
        <View style={ styles.signUpButtonWrap }>
          <Button
            text="新規アカウント作成"
            onPressEvent={() => props.navigation.navigate('SignUp')}
          />
        </View>
      </View>
      {/* <KeyboardAvoidingView
        behavior="padding"
        style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        }}
      >
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
          onPress={signIn}
          // disabled={!email || !password}
        >
          <Text style={{ color: 'white' }}>ログイン</Text>
        </TouchableOpacity>
        <Button title="SignUp" onPress={() => props.navigation.navigate('SignUp')} />
      </KeyboardAvoidingView> */}
    </View>
  );
};

export default Login;
