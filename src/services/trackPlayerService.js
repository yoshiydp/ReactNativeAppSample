import TrackPlayer from "react-native-track-player";

module.exports = async () => {
  TrackPlayer.addEventListener("remote-play", () => TrackPlayer.play());
  TrackPlayer.addEventListener("remote-pause", () => TrackPlayer.pause());
  TrackPlayer.addEventListener("remote-next", () => TrackPlayer.skipToNext());
  TrackPlayer.addEventListener("remote-previous", () => TrackPlayer.skipToPrevious());
  TrackPlayer.addEventListener("remote-seek", (data) => {
    if (data.position || data.position >= 0) {
      TrackPlayer.seekTo(Math.floor(data.position));
    }
  });
  TrackPlayer.addEventListener("remote-stop", () => TrackPlayer.destroy());
};
