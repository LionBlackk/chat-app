'use client';

import { User } from '@prisma/client';
import Image from 'next/image';

interface AvatarGroupProps {
  users: User[];
}
const AvatarGroup: React.FC<AvatarGroupProps> = ({ users }) => {
  const slicedUsers = users.slice(0, 3);

  const positionImage = {
    0: 'top-0 left-3',
    1: 'bottom-0 right-0',
    2: 'bottom-0',
  };

  return (
    <div className='relative h-11 w-11'>
      {slicedUsers.map((user, index) => (
        <div
          className={`absolute 
            inline-block
            h-5
            w-5
            overflow-hidden
            rounded-full
            object-cover
            ${positionImage[index as keyof typeof positionImage]}
          `}
        >
          <Image
            fill
            alt='Avatar'
            src={user.image || '/images/placeholder.jpg'}
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
