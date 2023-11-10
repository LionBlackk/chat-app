'use client';

import { User } from '@prisma/client';
import Modal from './Modal';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Input from './input/Input';
import Select from './input/Select';
import Button from './Button';

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}
const GroupChatModal: React.FC<GroupChatModalProps> = ({
  isOpen,
  onClose,
  users,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: [],
    },
  });

  const members = watch('members');

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post('/api/conversations', {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Create a group chat
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Create a chat with more than 2 people
            </p>
            <div className='mt-8 flex flex-col gap-y-8'>
              <Input
                disabled={isLoading}
                label='Name'
                id='name'
                register={register}
                required
                errors={errors}
              />
              <Select
                label='Members'
                disabled={isLoading}
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value) =>
                  setValue('members', value, {
                    shouldValidate: true,
                  })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div className='mt-6 flex items-center justify-center gap-x-6'>
          <Button disabled={isLoading} type='submit'>
            Create
          </Button>
          <Button
            disabled={isLoading}
            onClick={onClose}
            secondary
            type='button'
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
