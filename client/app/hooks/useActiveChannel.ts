import { useEffect } from 'react';
import useActiveList from './useActiveList';
import useSocket from './useSocket';

const useActiveChannel = () => {
  const { add, remove } = useActiveList();
  const socket = useSocket();
  useEffect(() => {
    socket.on('member_added', (email) => {
      add(email);
    });
    socket.on('member_removed', (email) => {
      remove(email);
    });
  }, [add, remove, socket]);
};
export default useActiveChannel;
