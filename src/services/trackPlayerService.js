import TrackPlayer, { Event } from "react-native-track-player";

export const PlaybackService = async function () {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemoteNext, () => TrackPlayer.skipToNext());
  TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.skipToPrevious());
  TrackPlayer.addEventListener(Event.RemoteSeek, (data) => {
    if (data.position || data.position >= 0) {
      TrackPlayer.seekTo(Math.floor(data.position));
    }
  });
  TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.destroy());
};
