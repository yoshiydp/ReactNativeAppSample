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

interface Props {
  containerStyle?: any;
  width: string;
  height: string;
  viewBox: string;
  gTransform?: string;
  pathD: string;
  pathTransform: string;
  pathFill: string;
}

const Icon = (props: Props) => {

  return (
    <View style={props.containerStyle}>
      <Svg
        width={props.width}
        height={props.height}
        viewBox={props.viewBox}>
        <G transform={props.gTransform}>
          <Path
            d={props.pathD}
            transform={props.pathTransform}
            fill={props.pathFill}
          />
        </G>
      </Svg>
    </View>
  );
};

export default Icon;
