import React, { useEffect, useState } from 'react';
import { useZegoCloud } from '@/app/hooks/useZegoCloud';
import CallNotification from './CallNotification';
import { useSession } from 'next-auth/react';
const SomeComponent = () => {
  // const session = useSession();
  // const currentUser = session.data?.user;
  // const appID = 1963662247; // Thay thế với AppID của bạn
  // const server = 'wss://webliveroom1963662247-api-bak.coolzcloud.com/ws';
  // const userID = currentUser?.email;
  // const userName = currentUser?.name;
  // const roomID = 'some-room-id';
  // const token = 'YOUR_TOKEN'; // Token để xác thực
  // const { localStream, remoteStreams } = useZegoCloud(
  //   appID,
  //   server,
  //   userID,
  //   userName,
  //   roomID,
  //   token
  // );
  // return (
  //   <div>
  //     <h2>Local Stream</h2>
  //     <div id='local-video'></div>
  //     <h2>Remote Streams</h2>
  //     {Object.entries(remoteStreams).map(([streamID, stream]) => (
  //       <div key={streamID} id={`remote-video-${streamID}`}></div>
  //     ))}
  //     <CallNotification
  //       appID={appID}
  //       server={server}
  //       token={token}
  //       userID={userID}
  //       userName={userName}
  //     />{' '}
  //   </div>
  // );
};
export default SomeComponent;
