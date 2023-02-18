import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { firebaseAuth, db } from "src/config/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

// Store
import { useSelector } from "store/index";
import { setMyProjectsItems, setMyProjectsFilterItems } from "store/MyProjectsItemsSlice";

// Components
import MainScreen from "components/templates/MainScreen";

// Constants
import * as TEXT from "constants/text";

interface Props {
  navigation: any;
}

const MyProjects = (props: Props) => {
  const dispatch = useDispatch();
  const myProjectsItems = useSelector((state) => state.myProjectsItems.myProjectsItems);
  const [searchValue, setSearchValue] = useState<string>("");
  const { uid }: any = firebaseAuth.currentUser;
  if (!uid) return;
  const docRef = doc(db, "users", uid);

  const getProjectData = async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      dispatch(setMyProjectsItems(docSnap.data().myProjectsData));
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getProjectData();
    onSnapshot(docRef, (doc) => {
      dispatch(setMyProjectsItems(doc.data()?.myProjectsData));
    });
  }, []);

  useEffect(() => {
    console.log("searchValue: " + searchValue);
    searchFilter();
  }, [searchValue]);

  const searchFilter = () => {
    if (searchValue) {
      dispatch(setMyProjectsFilterItems(searchValue));
    } else {
      getProjectData();
    }
  };

  return (
    <>
      <MainScreen
        title={TEXT.TITLE_MY_PROJECTS}
        navigation={props.navigation}
        myProjectDataItems={myProjectsItems}
        setSearchValue={setSearchValue}
      />
    </>
  );
};

export default MyProjects;
