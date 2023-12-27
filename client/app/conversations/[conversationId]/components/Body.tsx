'use client';

import { FullMessageType } from '@/app/types';
import MessageBox from './MessageBox';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import useConversation from '@/app/hooks/useConversation';
import useSocket from '@/app/hooks/useSocket';
import { useSession } from 'next-auth/react';
import { find } from 'lodash';
import SomeComponent from './SomeComponent';
import { useRouter } from 'next/navigation';

interface BodyProps {
  initialMessages: FullMessageType[] | any;
}
const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);
  const { conversationId } = useConversation();
  const socket = useSocket();
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    const currentUserEmail = session.data?.user?.email;
    socket.emit('connectionUser', currentUserEmail);
    socket.emit('conversations', {
      email: currentUserEmail,
      conversationId: conversationId,
    });
    // axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId, session.data?.user?.email]);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView();

    const newMessageHandler = (message: FullMessageType) => {
      // axios.post(`/api/conversations/${conversationId}/seen`);
      setMessages((current: any) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        axios.post(`/api/conversations/${conversationId}/seen`);
        return [...current, message];
      });
      bottomRef?.current?.scrollIntoView();
      // router.refresh();
    };
    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current: any) =>
        current.map((currentMessage: any) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }
          return currentMessage;
        })
      );
      // router.refresh();
    };

    socket.on('messageNew', newMessageHandler);
    socket.on('messageUpdate', updateMessageHandler);
    return () => {
      socket.off('messageNew', newMessageHandler);
      socket.off('messageUpdate', updateMessageHandler);
      socket.on('disconnect', (reason) => {
        console.log(reason);
      });
    };
  }, [conversationId]);

  return (
    <div className='h-full flex-1 overflow-y-auto'>
      {messages.map((item: any, index: any) => (
        <MessageBox
          key={item.id}
          isLast={index === messages.length - 1}
          data={item}
        />
      ))}
      <div className='pt-24' ref={bottomRef} />
    </div>
  );
};

export default Body;
