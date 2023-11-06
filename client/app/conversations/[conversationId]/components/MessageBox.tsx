import Avatar from '@/app/components/Avatar';
import { FullMessageType } from '@/app/types';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import Image from 'next/image';

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}
const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();
  const isOwn = data.sender.email === session.data?.user?.email;

  const seenList = (data.seen || [])
    .filter((user) => user.email !== data.sender.email)
    .map((user) => user.name)
    .join(', ');

  const container = clsx('flex p-4 gap-3', isOwn && 'justify-end');

  const body = clsx('flex flex-col gap-2', isOwn && 'items-end');

  const avatar = clsx(isOwn && 'order-2');

  const message = clsx(
    `
    text-sm w-fit overflow-hidden`,
    isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
    data.image ? 'rounded-lg p-0' : 'rounded-full py-2 px-3'
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className='flex items-center gap-1'>
          <div className='text-sm text-gray-500'>{data.sender.name}</div>
          <div className='text-sm text-gray-400'>
            {format(new Date(data.createdAt), 'p')}
          </div>
        </div>
        <div className={message}>
          {data.image ? (
            <Image
              alt='Image'
              height='288'
              width='288'
              src={data.image}
              className='
                translate
                cursor-pointer
                object-cover
                transition
                hover:scale-110
              '
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className='text-xs font-light text-gray-400'>{`Seen by ${seenList}`}</div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
