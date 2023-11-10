'use client';

import clsx from 'clsx';
import { FullConversationType } from '@/app/types';
import { MdOutlineGroupAdd } from 'react-icons/md';
import { useState } from 'react';
import useConversation from '@/app/hooks/useConversation';
import { useRouter } from 'next/navigation';
import ConversationBox from './ConversationBox';
import { User } from '@prisma/client';
import GroupChatModal from '@/app/components/GroupChatModal';

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
}
const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  users,
}) => {
  const [items, setItems] = useState(initialItems);
  const { conversationId, isOpen } = useConversation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const router = useRouter();
  return (
    <>
      <GroupChatModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        users={users}
      />
      <aside
        className={clsx(
          `
          fixed
          inset-y-0
          overflow-y-auto
          border-r
          border-gray-200
          pb-20
          lg:left-20
          lg:block
          lg:w-80
          lg:pb-0
        `,
          isOpen ? 'hidden' : 'left-0 block w-full'
        )}
      >
        <div className='px-5'>
          <div
            className='
              mb-4
              flex
              justify-between
              pt-4
            '
          >
            <div
              className='
              text-2xl
              font-bold
              text-neutral-900
            '
            >
              Chats
            </div>
            <div
              onClick={() => setIsOpenModal(true)}
              className='
                cursor-pointer
                rounded-full
                bg-gray-100
                p-2
                text-gray-600
                transition
                hover:opacity-75
              '
            >
              <MdOutlineGroupAdd size={20}></MdOutlineGroupAdd>
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
