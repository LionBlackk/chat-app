'use client';

import Avatar from '@/app/components/Avatar';
import useOtherUser from '@/app/hooks/useOtherUser';
import { Conversation, User } from '@prisma/client';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2';
import ProfileDrawer from './ProfileDrawer';
import AvatarGroup from '@/app/components/AvatarGroup';
import useActiveList from '@/app/hooks/useActiveList';
import { FaVideo } from 'react-icons/fa';
import { IoIosCall } from 'react-icons/io';
import useSocket from '@/app/hooks/useSocket';
import { useSession } from 'next-auth/react';
import SomeComponent from './SomeComponent';

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}
const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const session = useSession();
  useEffect(() => {
    const currentUserEmail = session.data?.user?.email;
  }, [session.data?.user?.email]);
  const currentUserEmail = session.data?.user?.email;
  const { members } = useActiveList();
  const socket = useSocket();
  const isActive = members.indexOf(otherUser?.email!) !== -1;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? 'Active' : 'Offline';
  }, [conversation, isActive]);

  const handleCallClick = useCallback(() => {
    // Trigger the "startCall" event to the server with call details
    socket.emit('startCall', {
      roomID: conversation.id,
      callerID: currentUserEmail, // Provide the caller's user ID
      targetEmail: otherUser.email, // Provide the target email from the conversation
    });
    // Optionally, handle your client-side call initiation logic here
  }, [socket, conversation, otherUser]);
  return (
    <>
      <ProfileDrawer
        isOpen={drawerOpen}
        data={conversation}
        onClose={() => setDrawerOpen(() => false)}
      />
      <div
        className='
        flex
        w-full
        items-center
        justify-between
        border-b-[1px]
        bg-white
        px-4
        py-3
        shadow-sm
        sm:px-4
        lg:px-6
      '
      >
        <div className='flex items-center gap-x-3'>
          <Link
            className='
              block
              cursor-pointer
              text-sky-500
              transition
              hover:text-sky-600
              lg:hidden
            '
            href='/conversations'
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className='flex flex-col'>
            <div className='font-medium'>
              {conversation.name || otherUser.name}
            </div>
            <div className='text-sm font-light text-gray-500'>{statusText}</div>
          </div>
        </div>
        <div className='flex items-center gap-x-3'>
          <IoIosCall
            className='cursor-pointer text-sky-500 hover:text-sky-600'
            size={28}
            onClick={handleCallClick}
          />
          <FaVideo
            className='cursor-pointer text-sky-500 hover:text-sky-600'
            size={28}
          />
          <HiEllipsisHorizontal
            onClick={() => setDrawerOpen(() => true)}
            className='
          cursor-pointer
          text-sky-500
          transition
          hover:text-sky-600  
          '
            size={32}
          />
          {/* <SomeComponent /> */}
        </div>
      </div>
    </>
  );
};

export default Header;
