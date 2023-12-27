'use client';
import { useEffect } from 'react';
import useSocket from '@/app/hooks/useSocket';
import { useZegoCloud } from '@/app/hooks/useZegoCloud';
interface CallNotificationProps {
  userID: any;
  userName: any;
  server: any;
  appID: any;
  token: any;
}
const CallNotification = ({
  userID,
  server,
  userName,
  appID,
  token,
}: CallNotificationProps) => {
  const socket = useSocket();
  useEffect(() => {
    socket.on('callUser', ({ roomID, callerID, targetEmail }) => {
      // Hiển thị thông báo cuộc gọi và đợi người dùng đồng ý/ từ chối
      const acceptCall = window.confirm(
        `Cuộc gọi từ ${callerID}, bạn có muốn nhận không?`
      );
      if (acceptCall) {
        // Join vào phòng call thông qua ZegoCloud nếu người dùng đồng ý
        const { localStream, remoteStreams, zg } = useZegoCloud(
          appID,
          server,
          userID,
          userName,
          roomID,
          token
        );
        // Xử lý hiển thị localStream và remoteStreams...
        // Và bắt đầu truyền dẫn stream...
      }
    });
    return () => {
      socket.off('callUser');
    };
  }, []);
  // Không cần hiển thị gì nếu không có cuộc gọi đến
  return null;
};
export default CallNotification;
