import React, { useEffect, useState } from 'react';
import { firebaseAuth, db } from 'src/config/firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

// Components
import MainScreen from 'components/templates/MainScreen';

// Constants
import * as TEXT from 'constants/text';

interface Props {
  navigation: any;
}

const MyProjects = (props: Props) => {
  const [projectData, setProjectData] = useState<any>([]);
  const { uid }: any = firebaseAuth.currentUser;
  if (!uid) return;
  const docRef = doc(db, 'users', uid);

  const getProjectData = async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProjectData(docSnap.data().projectData);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getProjectData();
    onSnapshot(docRef, (doc) => {
      setProjectData(doc.data()?.projectData);
      console.log("Current data: ", doc.data()?.projectData);
    });
  }, []);

  return (
    <>
      <MainScreen
        title={ TEXT.TITLE_MY_PROJECTS }
        navigation={ props.navigation }
        myProjectDataItems={ projectData }
      />
    </>
  );
};

export default MyProjects;
