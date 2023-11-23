'use client';

import { FullMessageType } from '@/app/types';
import MessageBox from './MessageBox';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import useConversation from '@/app/hooks/useConversation';
import useSocket from '@/app/hooks/useSocket';
import { useSession } from 'next-auth/react';
import { find } from 'lodash';

interface BodyProps {
  initialMessages: FullMessageType[];
}
const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);
  const { conversationId } = useConversation();
  const socket = useSocket();
  const session = useSession();
  useEffect(() => {
    const currentUserEmail = session.data?.user?.email;
    socket.emit('conversations', {
      email: currentUserEmail,
      conversationId: conversationId,
    });
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId, session.data?.user?.email, socket]);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView();

    const newMessageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });
      bottomRef?.current?.scrollIntoView();
    };
    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }
          return currentMessage;
        })
      );
    };

    socket.on('messageNew', newMessageHandler);
    socket.on('messageUpdate', updateMessageHandler);
    return () => {
      socket.on('disconnect', (reason) => {
        console.log(reason);
      });
    };
  }, [conversationId, socket]);

  return (
    <div className='h-full flex-1 overflow-y-auto'>
      {messages.map((item, index) => (
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
