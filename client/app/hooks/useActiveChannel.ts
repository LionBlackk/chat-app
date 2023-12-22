import { useEffect } from 'react';
import useActiveList from './useActiveList';
import useSocket from './useSocket';

const useActiveChannel = () => {
  const { set, add, remove, members } = useActiveList();
  const socket = useSocket();
  useEffect(() => {
    socket.on('connected_members', (members: string[]) => {
      console.log(members.length);
      if (members) {
        set(members);
      }
    });
    socket.on('member_added', (email) => {
      console.log('catch member_added');
      console.log('Member added:', email);
      add(email);
    });
    socket.on('member_removed', (email) => {
      console.log('Member removed:', email);
      remove(email);
    });
    return () => {
      // Xóa các listener khi component unmount
      // socket.off('member_added');
      // socket.off('member_removed');
      // socket.off('connected_members');
    };
  }, [add, remove, set, socket]);
};
export default useActiveChannel;
