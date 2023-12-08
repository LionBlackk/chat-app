'use client';
import useSocket from '@/app/hooks/useSocket';
import UserBox from './UserBox';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
interface UserListProps {
  items: User[];
}
const UserList: React.FC<UserListProps> = ({ items }) => {
  const socket = useSocket();
  const session = useSession();

  useEffect(() => {
    const currentUserEmail = session.data?.user?.email;
    socket.emit('connectionUser', currentUserEmail);
  }, [session.data?.user?.email, socket]);
  return (
    <aside
      className='
        fixed
        inset-y-0
        left-0
        block
        w-full
        overflow-y-auto
        border-r
        border-gray-200
        pb-20
        lg:left-20
        lg:block
        lg:w-80
        lg:pb-0
      '
    >
      <div className='px-4'>
        <div className='flex flex-col'>
          <div
            className='
              py-4
              text-2xl
              font-bold
              text-neutral-800
            '
          >
            People
          </div>
        </div>
        {items.map((item) => (
          <UserBox key={item.id} data={item}></UserBox>
        ))}
      </div>
    </aside>
  );
};

export default UserList;
