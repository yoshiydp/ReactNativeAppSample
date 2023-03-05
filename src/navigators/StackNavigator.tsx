import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth, db } from "src/config/firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import auth from "@react-native-firebase/auth";

// Store
import { useSelector } from "store/index";

// Main Screens
import LoadingScreen from "screens/Loading";
import LoginScreen from "screens/Login";
import SignUpScreen from "screens/SignUp";

// Lower Screens
import EditMyAccountScreen from "screens/EditMyAccount";
import EditProjectScreen from "screens/EditProject";
import EditTrackScreen from "screens/EditTrack";
import NewProjectScreen from "screens/NewProject";
import NewTrackScreen from "screens/NewTrack";
import PasswordResetScreen from "screens/PasswordReset";
import RecordingScreen from "screens/Recording";

// Components
import MainTabBar from "components/organisms/MainTabBar";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const subscribed = useSelector((state) => state.subscribe.subscribe);
  const [user, setUser] = useState<any>("");

  useEffect(() => {
    console.log("social subscribed: " + subscribed);
    if (subscribed) {
      const socialSubscribe = auth().onAuthStateChanged(onSocialStateChanged);
      return () => socialSubscribe();
    } else {
      const subscribe = onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          setUser(user);
          // console.log('stacked user:' + JSON.stringify(user));
        } else {
          setUser("");
          // console.log('stack user:' + JSON.stringify(user));
        }
      });
      return () => subscribe();
    }
  }, [subscribed]);

  const onSocialStateChanged = async (user: any) => {
    if (user) {
      setUser(user);
      const docRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(docRef);
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          displayName: user.displayName,
          myProjectsData: [],
          trackListData: [],
          createdAt: serverTimestamp(),
          deletedAt: null,
        });
      }
    } else {
      setUser("");
    }
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="LoginScreen">
      {user ? (
        <>
          <Stack.Screen name="MainTabBar" component={MainTabBar} />
        </>
      ) : (
        <>
          <Stack.Screen name="EditProject" component={EditProjectScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
      <Stack.Screen name="EditMyAccount" component={EditMyAccountScreen} />
      {/* <Stack.Screen name="EditProject" component={EditProjectScreen} /> */}
      <Stack.Screen name="EditTrack" component={EditTrackScreen} />
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="NewProject" component={NewProjectScreen} />
      <Stack.Screen name="NewTrack" component={NewTrackScreen} />
      <Stack.Screen name="PasswordReset" component={PasswordResetScreen} />
      <Stack.Screen name="Recording" component={RecordingScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
