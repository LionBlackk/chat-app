'use client';
import useConversation from '@/app/hooks/useConversation';
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import { GoSmiley } from 'react-icons/go';
import MessageInput from './MessageInput';
import { CldUploadButton } from 'next-cloudinary';
import UploadFile from './UploadFile';
import AudioInput from './AudioInput';
import { useEffect, useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import useMessageManagement from '@/app/hooks/useMessageManagement';
import { FullMessageType } from '@/app/types';
const Form = () => {
  const { conversationId } = useConversation();
  const [message, setMessage] = useState('');
  const [isOpenEmoji, setIsOpenEmoji] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { addMessage } = useMessageManagement();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });
    axios.post('/api/messages', {
      ...data,
      conversationId,
    });
    setMessage('');
  };

  const handleUpload = (result: any) => {
    axios.post('/api/messages', {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  const handleInputChange = (event: any) => {
    setMessage(event.target.value);
  };

  // const handleEmojiClick = (emoji: any) => {
  //   const input = inputRef.current;

  //   if (input) {
  //     const selectionStart: any = input.selectionStart;
  //     const selectionEnd: any = input.selectionEnd;

  //     const newMessage =
  //       message.substring(0, selectionStart) +
  //       emoji +
  //       message.substring(selectionEnd);

  //     // Move the cursor to the end of the inserted emoji
  //     input.selectionStart = input.selectionEnd = selectionStart + 1;

  //     setValue('message', newMessage);
  //     setMessage(newMessage);
  //   }
  // };

  useEffect(() => {
    if (inputRef && inputRef.current) {
      setMessage(inputRef.current.value);
      setValue('message', inputRef.current.value);
    }
  }, [inputRef?.current?.value]);

  const handleEmojiClick = (emoji: any) => {
    setMessage((prevMessage) => {
      const input = inputRef.current;

      if (input) {
        const selectionStart: any = input.selectionStart;
        const selectionEnd: any = input.selectionEnd;

        const newMessage =
          prevMessage.substring(0, selectionStart) +
          emoji +
          prevMessage.substring(selectionEnd);

        // Move the cursor to the end of the inserted emoji
        input.selectionStart = input.selectionEnd = selectionStart + 1;

        setValue('message', newMessage);
        return newMessage;
      }
      return prevMessage;
    });
  };

  return (
    <div
      className='
        flex 
        w-full 
        items-center 
        gap-2 
        border-t 
        bg-white 
        px-4 
        py-4 
        lg:gap-4  
    '
    >
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset='vtil6eih'
      >
        <HiPhoto size={30} className='text-sky-500' />
      </CldUploadButton>
      <UploadFile conversationId={conversationId} />
      <AudioInput conversationId={conversationId} />
      <button onClick={() => setIsOpenEmoji((prev) => !prev)}>
        <GoSmiley size={30} className='text-[#0EA5E9]' />
      </button>
      {isOpenEmoji && (
        <div
          className={`fixed bottom-[70px] ${
            isOpenEmoji ? 'inline-block' : 'none'
          }`}
        >
          <EmojiPicker
            onEmojiClick={(data) => {
              handleEmojiClick(data.emoji);
            }}
          />
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex w-full items-center gap-x-3'
      >
        <MessageInput
          id='message'
          required
          placeholder='Write a message'
          errors={errors}
          inputRef={inputRef}
          value={message}
          register={register}
          setMessage={setMessage}
        />
        <button
          onClick={() => {}}
          className='
            cursor-pointer
            rounded-full
            bg-sky-500
            p-2
            transition
            hover:bg-sky-600
          '
        >
          <HiPaperAirplane size={18} className='text-white' />
        </button>
      </form>
    </div>
  );
};

export default Form;
