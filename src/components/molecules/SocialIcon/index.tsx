import React from "react";
import { TouchableOpacity } from "react-native";

// Components
import Icon from "components/atoms/Icon";

// Interfaces
import { svgType1, svgType2, svgType3, svgType4, svgType5 } from "interfaces/svgInterface";

// Styles
import styles from "./SocialIcon.scss";

interface Props extends svgType1, svgType2, svgType3, svgType4, svgType5 {
  onPressEvent?: () => void;
}

const SocialIcon = (props: Props) => {

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={ styles.container }
      onPress={ props.onPressEvent }>
      { props.svgType === 1 ?
        (
          <Icon
            svgType={ props.svgType }
            width={ props.width }
            height={ props.height }
            viewBox={ props.viewBox }
            pathD1={ props.pathD1 }
            pathTransform1={ props.pathTransform1 }
            pathFill={ props.pathFill }
          />
        )
        : props.svgType === 5 ?
          (
            <Icon
              svgType={ props.svgType }
              width={ props.width }
              height={ props.height }
              viewBox={ props.viewBox }
              pathD1={ props.pathD1 }
              pathD2={ props.pathD2 }
              pathD3={ props.pathD3 }
              pathD4={ props.pathD4 }
              pathD5={ props.pathD5 }
              pathFill1={ props.pathFill1 }
              pathFill2={ props.pathFill2 }
              pathFill3={ props.pathFill3 }
              pathFill4={ props.pathFill4 }
              pathFill5={ props.pathFill5 }
              fillRule={ props.fillRule }
            />
          )
          : ""
      }
    </TouchableOpacity>
  );
};

export default SocialIcon;
