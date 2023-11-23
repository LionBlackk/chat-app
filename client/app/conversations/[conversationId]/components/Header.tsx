'use client';

import Avatar from '@/app/components/Avatar';
import useOtherUser from '@/app/hooks/useOtherUser';
import { Conversation, User } from '@prisma/client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2';
import ProfileDrawer from './ProfileDrawer';
import AvatarGroup from '@/app/components/AvatarGroup';
import useActiveList from '@/app/hooks/useActiveList';

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}
const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? 'Active' : 'Offline';
  }, [conversation, isActive]);

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
      </div>
    </>
  );
};

export default Header;
