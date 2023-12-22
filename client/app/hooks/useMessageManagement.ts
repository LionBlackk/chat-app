import { useState } from 'react';
import axios from 'axios';
import { FullMessageType } from '../types';
const useMessageManagement = () => {
  const [messages, setMessages] = useState<FullMessageType[]>([]);

  const addMessage = async (newMessage: FullMessageType) => {
    try {
      // Gọi API để tạo mới tin nhắn
      const response = await axios.post('/api/messages', newMessage);
      // Nếu API thành công, thêm tin nhắn vào danh sách tin nhắn
      setMessages((prevMessages) => [...prevMessages, response.data]);
    } catch (error) {
      console.error('Error adding message:', error);
    }
  };

  // Các hàm khác có thể được thêm vào nếu cần

  return { messages, addMessage };
};

export default useMessageManagement;
