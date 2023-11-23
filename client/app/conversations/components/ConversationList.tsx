'use client';

import clsx from 'clsx';
import { FullConversationType } from '@/app/types';
import { MdOutlineGroupAdd } from 'react-icons/md';
import { useEffect, useMemo, useState } from 'react';
import useConversation from '@/app/hooks/useConversation';
import { useRouter } from 'next/navigation';
import ConversationBox from './ConversationBox';
import { User } from '@prisma/client';
import GroupChatModal from '@/app/components/GroupChatModal';
import { useSession } from 'next-auth/react';
import useSocket from '@/app/hooks/useSocket';
import { find } from 'lodash';

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
  const session = useSession();
  const socket = useSocket();
  const conversationKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);
  useEffect(() => {
    if (!conversationKey) return;

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversationId })) {
          return current;
        }
        return [...current, conversation];
      });
    };

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }
          return currentConversation;
        })
      );
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.filter(
          (currentConversation) => currentConversation.id !== conversation.id
        )
      );
    };

    socket.on('conversationNew', newHandler);
    socket.on('conversationUpdate', updateHandler);
    socket.on('conversationRemove', removeHandler);
  }, [conversationKey, router, socket]);
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
