// useZegoCloud.js
import { useEffect, useState } from 'react';
import { ZegoExpressEngine } from 'zego-express-engine-webrtc';
export const useZegoCloud = (
  appID: any,
  server: any,
  userID: any,
  userName: any,
  roomID: any,
  token: any
) => {
  // State để quản lý các streams
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState({});
  const [zg, setZg] = useState<any>(null);
  useEffect(() => {
    if (appID && server && userID && userName && roomID && token) {
      // Instance initialization
      const zegoInstance = new ZegoExpressEngine(appID, server);
      // Set up listeners
      zegoInstance.on(
        'roomStreamUpdate',
        async (roomID, updateType, streamList) => {
          if (updateType === 'ADD') {
            const newRemoteStreams: any = { ...remoteStreams };
            for (let streamInfo of streamList) {
              const remoteStream = await zegoInstance.startPlayingStream(
                streamInfo.streamID
              );
              newRemoteStreams[streamInfo.streamID] = remoteStream;
            }
            setRemoteStreams(newRemoteStreams);
          } else if (updateType === 'DELETE') {
            const newRemoteStreams: any = { ...remoteStreams };
            for (let streamInfo of streamList) {
              zegoInstance.stopPlayingStream(streamInfo.streamID);
              delete newRemoteStreams[streamInfo.streamID];
            }
            setRemoteStreams(newRemoteStreams);
          }
        }
      );
      // Check browser support, log in to the room, and create local stream
      (async () => {
        const result = await zegoInstance.checkSystemRequirements();
        console.log('System Requirements: ', result);
        if (result.webRTC) {
          const loginResult = await zegoInstance.loginRoom(
            roomID,
            token,
            { userID, userName },
            { userUpdate: true }
          );
          console.log('Login Result: ', loginResult);
          if (loginResult) {
            const stream: any = await zegoInstance.createZegoStream();
            stream.playVideo(document.querySelector('#local-video'));
            setLocalStream(stream);
            zegoInstance.startPublishingStream(`${userID}_stream`, stream);
          }
        }
      })();
      setZg(zegoInstance);
      return () => {
        // Clean up
        zegoInstance.logoutRoom(roomID);
        if (localStream) {
          zegoInstance.stopPublishingStream(`${userID}_stream`);
          zegoInstance.destroyStream(localStream);
        }
        Object.keys(remoteStreams).forEach((streamID) => {
          zegoInstance.stopPlayingStream(streamID);
        });
        // Remove listeners
        zegoInstance.off('roomStreamUpdate');
      };
    }
  }, [appID, server, userID, userName, roomID, token]);
  return { localStream, remoteStreams, zg };
};
