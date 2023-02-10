import React from "react";
import { View, Text} from "react-native";

// Components
import SocialIcon from "components/molecules/SocialIcon";

// Interfaces
import { svgType1, svgType2, svgType3, svgType4, svgType5 } from "interfaces/svgInterface";

// Styles
import styles from "./SocialSignIn.scss";

interface OnPressEvent {
  onPressEvent?: () => void;
}

interface Props {
  title: string;
  socialIconItems: Array<svgType1 & svgType2 & svgType3 & svgType4 & svgType5 & OnPressEvent>;
}

const SocialSignIn = (props: Props) => {

  return (
    <View style={ styles.container }>
      <View style={ styles.titleWrap }>
        <View style={ styles.titleBorder }></View>
        <Text style={ styles.title }>
          { props.title }
        </Text>
        <View style={ styles.titleBorder }></View>
      </View>
      <View style={ styles.socialList }>
        { props.socialIconItems.map((item, index) => (
          <View style={ styles.socialIconItems } key={ index }>
            { item.svgType === 1 ?
              (
                <SocialIcon
                  svgType={ item.svgType }
                  width={ item.width }
                  height={ item.height }
                  viewBox={ item.viewBox }
                  pathD1={ item.pathD1 }
                  pathTransform1={ item.pathTransform1 }
                  pathFill={ item.pathFill }
                  onPressEvent={ item.onPressEvent }
                />
              )
              : item.svgType === 5 ?
                (
                  <SocialIcon
                    svgType={ item.svgType }
                    width={ item.width }
                    height={ item.height }
                    viewBox={ item.viewBox }
                    pathD1={ item.pathD1 }
                    pathD2={ item.pathD2 }
                    pathD3={ item.pathD3 }
                    pathD4={ item.pathD4 }
                    pathD5={ item.pathD5 }
                    pathFill1={ item.pathFill1 }
                    pathFill2={ item.pathFill2 }
                    pathFill3={ item.pathFill3 }
                    pathFill4={ item.pathFill4 }
                    pathFill5={ item.pathFill5 }
                    fillRule={ item.fillRule }
                    onPressEvent={ item.onPressEvent }
                  />
                )
                : ""
            }
          </View>
        ))}
      </View>
    </View>
  );
};

export default SocialSignIn;
