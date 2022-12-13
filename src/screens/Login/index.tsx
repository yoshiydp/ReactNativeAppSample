import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

// Components
import IntroMessage from 'src/components/molecules/IntroMessage';
import AuthForm from 'src/components/templates/AuthForm';

// Styles
import styles from './Login.scss';

interface Props {
  navigation: any;
}

const Login = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
  }, []);

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') console.log('メールアドレスまたはユーザー名が間違っています');
      if (error.code === 'auth/wrong-password') console.log('パスワードが間違っています');
      if (error.code === 'auth/user-not-found') console.log('ユーザーが見つかりませんでした');
      console.log(error.code);
    }
  };

  return (
    <View style={styles.container}>
      <IntroMessage />
      <AuthForm />
      <KeyboardAvoidingView
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
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
