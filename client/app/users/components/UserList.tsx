'use client';
import UserBox from './UserBox';
import { User } from '@prisma/client';
interface UserListProps {
  items: User[];
}
const UserList: React.FC<UserListProps> = ({ items }) => {
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
