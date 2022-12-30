import React from 'react';
import { View } from 'react-native';
import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

// Interfaces
import { svgType1, svgType2, svgType3, svgType4 } from 'interfaces/svgInterface';

const Icon = (props: (svgType1 & svgType2 & svgType3 & svgType4)) => {

  return (
    <View style={props.containerStyle}>
      {
        props.svgType === 1 ?
        (
          <Svg
            width={props.width}
            height={props.height}
            viewBox={props.viewBox}>
            <G transform={props.gTransform}>
              <Path
                d={props.pathD1}
                transform={props.pathTransform1}
                fill={props.pathFill}
              />
              <Path
                d={props.pathD2}
                transform={props.pathTransform2}
                fill={props.pathFill}
              />
              <Path
                d={props.pathD3}
                transform={props.pathTransform3}
                fill={props.pathFill}
              />
            </G>
          </Svg>
        )
        : props.svgType === 2 ?
        (
          <Svg
            width={props.width}
            height={props.height}
            viewBox={props.viewBox}>
            <G transform={props.parentGTransform}>
              <G transform={props.childGTransform}>
                <Path
                  d={props.pathD}
                  transform={props.pathTransform}
                  fill={props.pathFill}
                />
              </G>
            </G>
          </Svg>
        )
        : props.svgType === 3 ?
        (
          <Svg
            width={props.width}
            height={props.height}
            viewBox={props.viewBox}>
            <G transform={props.parentGTransform1}>
              <G transform={props.childGTransform1}>
                <Path
                  d={props.pathD1}
                  transform={props.pathTransform1}
                  fill={props.pathFill}
                />
              </G>
            </G>
            <G transform={props.parentGTransform2}>
              <G transform={props.childGTransform2}>
                <Path
                  d={props.pathD2}
                  transform={props.pathTransform2}
                  fill={props.pathFill}
                />
              </G>
            </G>
          </Svg>
        )
        : props.svgType === 4 ?
        (
          <Svg
            width={props.width}
            height={props.height}
            viewBox={props.viewBox}>
            <Path
              d={props.pathD1}
              transform={props.pathTransform1}
              fill={props.pathFill}
            />
            <Path
              d={props.pathD2}
              transform={props.pathTransform2}
              fill={props.pathFill}
            />
            <Path
              d={props.pathD3}
              transform={props.pathTransform3}
              fill={props.pathFill}
            />
            <Path
              d={props.pathD4}
              transform={props.pathTransform4}
              fill={props.pathFill}
            />
            <Path
              d={props.pathD5}
              transform={props.pathTransform5}
              fill={props.pathFill}
            />
          </Svg>
        )
        : ''
      }
    </View>
  );
};

export default Icon;
