import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Slider, Icon } from "@rneui/themed";
import { VolumeManager } from "react-native-volume-manager";

// Components
import SvgIcon from "components/atoms/Icon";

// Constants
import * as COLOR from "constants/color";
import * as SVGPATH from "constants/svgPath";

// Styles
import styles from "./VolumeSeekBar.scss";

const VolumeSeekBar = () => {
  const [deviceVolume, setDeviceVolume] = useState<number | any>(0);

  const getInitialDeviceVolume = async () => {
    await VolumeManager.getVolume("music").then((result) => {
      setDeviceVolume(result);
    });
  };

  useEffect(() => {
    getInitialDeviceVolume();
    const volumeListener = VolumeManager.addVolumeListener((result) => {
      setDeviceVolume(result.volume);
    });
    return () => volumeListener.remove();
  }, []);

  const onChangeVolume = async (volume: any) => {
    setDeviceVolume(volume);
    await VolumeManager.setVolume(volume, {
      type: "system",
      showUI: true,
      playSound: false,
    });
  };

  return (
    <View style={styles.container}>
      <Slider
        value={deviceVolume}
        onValueChange={onChangeVolume}
        maximumValue={1}
        minimumValue={0}
        minimumTrackTintColor={COLOR.COLOR_GRAY_TYPE1}
        maximumTrackTintColor={COLOR.COLOR_GRAY_TYPE3}
        step={0}
        trackStyle={styles["track-style"]}
        thumbStyle={styles["thumb-style"]}
        thumbProps={{
          children: (
            <Icon
              size={6}
              reverse
              containerStyle={styles["icon-thumb-style"]}
              color={COLOR.COLOR_GRAY_TYPE1}
            />
          ),
        }}
      />
      <View style={styles["seek-time-wrap"]}></View>
      <SvgIcon
        svgType={1}
        width="8"
        height="11.248"
        viewBox="0 0 8 11.248"
        gTransform="translate(0 -14.318)"
        pathD1={SVGPATH.ICON_SPEAKER_LOW}
        pathFill={COLOR.COLOR_GRAY_TYPE1}
        containerStyle={styles["icon-speaker-low-style"]}
      />
      <SvgIcon
        svgType={1}
        width="16"
        height="12.711"
        viewBox="0 0 16 12.711"
        gTransform="translate(0 -9.565)"
        pathD1={SVGPATH.ICON_SPEAKER}
        pathFill={COLOR.COLOR_GRAY_TYPE1}
        containerStyle={styles["icon-speaker-style"]}
      />
    </View>
  );
};

export default VolumeSeekBar;
