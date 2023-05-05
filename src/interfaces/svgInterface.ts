export interface SvgCommonProps {
  svgType: number;
  containerStyle?: any;
  width: string;
  height: string;
  viewBox: string;
  pathFill?: string;
}

export interface SvgType1 extends SvgCommonProps {
  gTransform?: string;
  pathD1?: string;
  pathTransform1?: string;
  pathD2?: string;
  pathTransform2?: string;
  pathD3?: string;
  pathTransform3?: string;
  pathD4?: string;
  pathTransform4?: string;
}

export interface SvgType2 extends SvgCommonProps {
  parentGTransform?: string;
  childGTransform?: string;
  pathD?: string;
  pathTransform?: string;
}

export interface SvgType3 extends SvgCommonProps {
  parentGTransform1?: string;
  parentGTransform2?: string;
  childGTransform1?: string;
  childGTransform2?: string;
  pathD1?: string;
  pathD2?: string;
  pathTransform1?: string;
  pathTransform2?: string;
}

export interface SvgType4 extends SvgCommonProps {
  pathD1?: string;
  pathD2?: string;
  pathD3?: string;
  pathD4?: string;
  pathD5?: string;
  pathTransform1?: string;
  pathTransform2?: string;
  pathTransform3?: string;
  pathTransform4?: string;
  pathTransform5?: string;
}

export interface SvgType5 extends SvgCommonProps {
  pathD1?: string;
  pathD2?: string;
  pathD3?: string;
  pathD4?: string;
  pathD5?: string;
  pathFill1?: string;
  pathFill2?: string;
  pathFill3?: string;
  pathFill4?: string;
  pathFill5?: string;
  fillRule?: string;
}

export interface SvgType6 extends SvgCommonProps {
  parentGTransform?: string;
  childGTransform?: string;
  coordinate?: string;
  radius?: string;
  pathTransform1?: string;
  pathTransform2?: string;
  pathTransform3?: string;
}

export interface SvgType7 extends SvgCommonProps {
  parentGTransform?: string;
  childGTransform?: string;
  grandchildGTransform?: string;
  pathD1?: string;
  pathD2?: string;
  pathTransform1?: string;
  pathTransform2?: string;
}

export interface SvgType8 extends SvgCommonProps {
  rectWidth?: string;
  rectHeight?: string;
  rectRx?: string;
  rectTransform1?: string;
  rectTransform2?: string;
}
