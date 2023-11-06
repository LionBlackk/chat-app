'use client';

import { FullMessageType } from '@/app/types';
import MessageBox from './MessageBox';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useConversation from '@/app/hooks/useConversation';

interface BodyProps {
  initialMessages: FullMessageType[];
}
const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const { conversationId } = useConversation();
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);
  return (
    <div className='h-full flex-1 overflow-y-auto'>
      {initialMessages.map((item, index) => (
        <MessageBox
          key={item.id}
          isLast={index === messages.length - 1}
          data={item}
        />
      ))}
    </div>
  );
};

export default Body;
