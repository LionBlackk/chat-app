'use client';
import useConversation from '@/app/hooks/useConversation';
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import MessageInput from './MessageInput';
import { CldUploadButton } from 'next-cloudinary';
import UploadFile from './UploadFile';
const Form = () => {
  const { conversationId } = useConversation();
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
  };

  const handleUpload = (result: any) => {
    axios.post('/api/messages', {
      image: result?.info?.secure_url,
      conversationId,
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex w-full items-center gap-x-3'
      >
        <MessageInput
          id='message'
          register={register}
          required
          placeholder='Write a message'
          errors={errors}
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
