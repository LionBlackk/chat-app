// 'use client';
import { useEffect } from 'react';
import getConversations from '../actions/getConversations';
import getMessages from '../actions/getMessages';
import getUsers from '../actions/getUsers';
import Sidebar from '../components/sidebar/Sidebar';
import useConversation from '../hooks/useConversation';
import ConversationList from './components/ConversationList';

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();
  return (
    <Sidebar>
      <div className='h-full'>
        <ConversationList
          initialItems={conversations!}
          users={users}
        ></ConversationList>
        {children}
      </div>
    </Sidebar>
  );
}
