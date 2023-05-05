import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { firebaseAuth, db } from "src/config/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

// Store
import { useSelector } from "store/index";
import { setTrackListItems, setTrackListFilterItems } from "store/TrackListItemsSlice";

// Components
import MainScreen from "components/templates/MainScreen";

// Constants
import * as TEXT from "constants/text";

interface Props {
  navigation: any;
}

const TrackList = (props: Props) => {
  const dispatch = useDispatch();
  const trackListItems = useSelector((state) => state.trackListItems.trackListItems);
  const [searchValue, setSearchValue] = useState<string>("");
  const { uid }: any = firebaseAuth.currentUser;
  if (!uid) return;
  const docRef = doc(db, "users", uid);

  const getTrackListData = async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const trackListData = docSnap.data().trackListData;
      const sorted = trackListData.sort((a: any, b: any) => {
        a = a.trackTitle.toString().toLowerCase();
        b = b.trackTitle.toString().toLowerCase();
        return a > b ? 1 : b > a ? -1 : 0;
      });
      dispatch(setTrackListItems(sorted));
    } else {
      console.log("No such document!");
    }
  };

  const searchFilter = () => {
    if (searchValue) {
      dispatch(setTrackListFilterItems(searchValue));
    } else {
      getTrackListData();
    }
  };

  useEffect(() => {
    getTrackListData();
    onSnapshot(docRef, (doc) => {
      const sorted = doc.data()?.trackListData.sort((a: any, b: any) => {
        a = a.trackTitle.toString().toLowerCase();
        b = b.trackTitle.toString().toLowerCase();
        return a > b ? 1 : b > a ? -1 : 0;
      });
      dispatch(setTrackListItems(sorted));
    });
  }, []);

  useEffect(() => {
    console.log("searchValue: " + searchValue);
    searchFilter();
  }, [searchValue]);

  return (
    <>
      <MainScreen
        title={TEXT.TITLE_TRACK_LIST}
        navigation={props.navigation}
        trackListDataItems={trackListItems}
        setSearchValue={setSearchValue}
      />
    </>
  );
};

export default TrackList;
