import TrackPlayer, { Event } from "react-native-track-player";

export const PlaybackService = () => {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    console.log("Event.RemotePause");
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    console.log("Event.RemotePlay");
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    console.log("Event.RemoteNext");
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    console.log("Event.RemotePrevious");
    TrackPlayer.skipToPrevious();
  });

  TrackPlayer.addEventListener(Event.RemoteJumpForward, async (event) => {
    console.log("Event.RemoteJumpForward", event);
    await TrackPlayer.seekTo(event.interval);
  });

  TrackPlayer.addEventListener(Event.RemoteJumpBackward, async (event) => {
    console.log("Event.RemoteJumpBackward", event);
    await TrackPlayer.seekTo(-event.interval);
  });

  TrackPlayer.addEventListener(Event.RemoteSeek, (event) => {
    console.log("Event.RemoteSeek", event);
    TrackPlayer.seekTo(event.position);
  });

  TrackPlayer.addEventListener(Event.RemoteDuck, async (event) => {
    console.log("Event.RemoteDuck", event);
  });

  TrackPlayer.addEventListener(Event.PlaybackQueueEnded, (event) => {
    console.log("Event.PlaybackQueueEnded", event);
  });

  // TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, (event) => {
  //   console.log("Event.PlaybackActiveTrackChanged", event);
  // });

  // TrackPlayer.addEventListener(Event.PlaybackPlayWhenReadyChanged, (event) => {
  //   console.log("Event.PlaybackPlayWhenReadyChanged", event);
  // });

  TrackPlayer.addEventListener(Event.PlaybackState, (event) => {
    console.log("Event.PlaybackState", event);
  });

  TrackPlayer.addEventListener(Event.PlaybackMetadataReceived, (event) => {
    console.log("Event.PlaybackMetadataReceived", event);
  });

  // TrackPlayer.addEventListener(Event.PlaybackMetadataReceived, async ({ title, artist }) => {
  //   const activeTrack = await TrackPlayer.getActiveTrackIndex();
  //   TrackPlayer.updateNowPlayingMetadata({
  //     artist: [title, artist].filter(Boolean).join(" - "),
  //     title: activeTrack?.title,
  //     artwork: activeTrack?.artwork,
  //   });
  // });
};
