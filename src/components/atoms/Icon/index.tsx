import React from "react";
import { View } from "react-native";
import Svg, { Circle, G, Path, Rect } from "react-native-svg";

// Interfaces
import {
  svgType1,
  svgType2,
  svgType3,
  svgType4,
  svgType5,
  svgType6,
  svgType7,
  svgType8,
} from "interfaces/svgInterface";

interface Props
  extends svgType1,
    svgType2,
    svgType3,
    svgType4,
    svgType5,
    svgType6,
    svgType7,
    svgType8 {
  containerStyle?: any;
}

const Icon = (props: Props) => {
  return (
    <View style={props.containerStyle}>
      {props.svgType === 1 ? (
        <Svg width={props.width} height={props.height} viewBox={props.viewBox}>
          <G transform={props.gTransform}>
            <Path d={props.pathD1} transform={props.pathTransform1} fill={props.pathFill} />
            <Path d={props.pathD2} transform={props.pathTransform2} fill={props.pathFill} />
            <Path d={props.pathD3} transform={props.pathTransform3} fill={props.pathFill} />
          </G>
        </Svg>
      ) : props.svgType === 2 ? (
        <Svg width={props.width} height={props.height} viewBox={props.viewBox}>
          <G transform={props.parentGTransform}>
            <G transform={props.childGTransform}>
              <Path d={props.pathD} transform={props.pathTransform} fill={props.pathFill} />
            </G>
          </G>
        </Svg>
      ) : props.svgType === 3 ? (
        <Svg width={props.width} height={props.height} viewBox={props.viewBox}>
          <G transform={props.parentGTransform1}>
            <G transform={props.childGTransform1}>
              <Path d={props.pathD1} transform={props.pathTransform1} fill={props.pathFill} />
            </G>
          </G>
          <G transform={props.parentGTransform2}>
            <G transform={props.childGTransform2}>
              <Path d={props.pathD2} transform={props.pathTransform2} fill={props.pathFill} />
            </G>
          </G>
        </Svg>
      ) : props.svgType === 4 ? (
        <Svg width={props.width} height={props.height} viewBox={props.viewBox}>
          <Path d={props.pathD1} transform={props.pathTransform1} fill={props.pathFill} />
          <Path d={props.pathD2} transform={props.pathTransform2} fill={props.pathFill} />
          <Path d={props.pathD3} transform={props.pathTransform3} fill={props.pathFill} />
          <Path d={props.pathD4} transform={props.pathTransform4} fill={props.pathFill} />
          <Path d={props.pathD5} transform={props.pathTransform5} fill={props.pathFill} />
        </Svg>
      ) : props.svgType === 5 ? (
        <Svg width={props.width} height={props.height} viewBox={props.viewBox}>
          <Path d={props.pathD1} fill={props.pathFill1} fill-rule={props.fillRule} />
          <Path d={props.pathD2} fill={props.pathFill2} fill-rule={props.fillRule} />
          <Path d={props.pathD3} fill={props.pathFill3} fill-rule={props.fillRule} />
          <Path d={props.pathD4} fill={props.pathFill4} fill-rule={props.fillRule} />
          <Path d={props.pathD5} fill={props.pathFill5} fill-rule={props.fillRule} />
        </Svg>
      ) : props.svgType === 6 ? (
        <Svg width={props.width} height={props.height} viewBox={props.viewBox}>
          <G transform={props.parentGTransform}>
            <G transform={props.childGTransform}>
              <Circle
                cx={props.coordinate}
                cy={props.coordinate}
                r={props.radius}
                transform={props.pathTransform1}
                fill={props.pathFill}
              />
              <Circle
                cx={props.coordinate}
                cy={props.coordinate}
                r={props.radius}
                transform={props.pathTransform2}
                fill={props.pathFill}
              />
              <Circle
                cx={props.coordinate}
                cy={props.coordinate}
                r={props.radius}
                transform={props.pathTransform3}
                fill={props.pathFill}
              />
            </G>
          </G>
        </Svg>
      ) : props.svgType === 7 ? (
        <Svg width={props.width} height={props.height} viewBox={props.viewBox}>
          <G transform={props.parentGTransform}>
            <G transform={props.childGTransform}>
              <G transform={props.grandchildGTransform}>
                <Path d={props.pathD1} transform={props.pathTransform1} fill={props.pathFill} />
                <Path d={props.pathD2} transform={props.pathTransform2} fill={props.pathFill} />
              </G>
            </G>
          </G>
        </Svg>
      ) : props.svgType === 8 ? (
        <Svg width={props.width} height={props.height} viewBox={props.viewBox}>
          <G transform={props.gTransform}>
            <Rect
              width={props.rectWidth}
              height={props.rectHeight}
              rx={props.rectRx}
              transform={props.rectTransform1}
              fill={props.pathFill}
            />
            <Rect
              width={props.rectWidth}
              height={props.rectHeight}
              rx={props.rectRx}
              transform={props.rectTransform2}
              fill={props.pathFill}
            />
          </G>
        </Svg>
      ) : (
        ""
      )}
    </View>
  );
};

export default Icon;
