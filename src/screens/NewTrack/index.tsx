import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// Store
import { hideOverlay } from "store/OverlaySlice";
import { hideMainTabMenu } from "store/MainTabMenuSlice";

// Components
import LowerScreen from "components/templates/LowerScreen";

// Constants
import * as TEXT from "constants/text";

interface Props {
  navigation: any;
}

const NewTrack = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideOverlay());
    dispatch(hideMainTabMenu());
  }, []);

  return (
    <>
      <LowerScreen title={TEXT.TITLE_NEW_TRACK} navigation={props.navigation} />
    </>
  );
};

export default NewTrack;
