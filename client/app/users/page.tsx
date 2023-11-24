'use client';
import { useSession } from 'next-auth/react';
import EmptyState from '../components/EmptyState';
import useSocket from '../hooks/useSocket';
import { useEffect } from 'react';

const Users = () => {
  const socket = useSocket();
  const session = useSession();

  useEffect(() => {
    const currentUserEmail = session.data?.user?.email;
    socket.emit('connectionUser', currentUserEmail);
  }, [session.data?.user?.email, socket]);
  return (
    <div
      className='
        hidden
        h-full
        lg:block
        lg:pl-80
    '
    >
      <EmptyState></EmptyState>
    </div>
  );
};

export default Users;
