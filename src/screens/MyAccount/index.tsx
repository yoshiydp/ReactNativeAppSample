import React from "react";

// Components
import MainScreen from "components/templates/MainScreen";

// Constants
import * as TEXT from "constants/text";

interface Props {
  navigation: any;
}

const MyAccount = (props: Props) => {
  return (
    <>
      <MainScreen title={TEXT.TITLE_MY_ACCOUNT} navigation={props.navigation} />
    </>
  );
};

export default MyAccount;
