'use client';
import clsx from 'clsx';
import EmptyState from '../components/EmptyState';
import useConversation from '../hooks/useConversation';
import { useEffect } from 'react';
import useSocket from '../hooks/useSocket';
import { useSession } from 'next-auth/react';

const Home = () => {
  const { isOpen } = useConversation();
  const socket = useSocket();
  const session = useSession();

  useEffect(() => {
    const currentUserEmail = session.data?.user?.email;
    socket.emit('connectionUser', currentUserEmail);
  }, [session.data?.user?.email, socket]);
  return (
    <div
      className={clsx(
        `
        h-full
        lg:block
        lg:pl-80
      `,
        isOpen ? 'block' : 'hidden'
      )}
    >
      <EmptyState></EmptyState>
    </div>
  );
};

export default Home;
