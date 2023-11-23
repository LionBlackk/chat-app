'use client';

import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Modal from './Modal';
import Input from './input/Input';
import Image from 'next/image';
import { CldUploadButton } from 'next-cloudinary';
import Button from './Button';

interface SettingsModalProps {
  isOpen?: boolean;
  currentUser: User;
  onClose: () => void;
}
const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  currentUser,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch('image');

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    (data) => {
      setIsLoading(true);
      axios
        .post('/api/settings', data)
        .then(() => {
          router.refresh();
          onClose();
        })
        .catch(() => toast.error('Something went wrong!'))
        .finally(() => setIsLoading(false));
    },
    [currentUser, router, onClose]
  );

  const handleUpload = (data: any) => {
    setValue('image', data.info.secure_url, {
      shouldValidate: true,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-12'>
          <div className='border-b border-gray-500/30 pb-12'>
            <h2 className='text-base font-semibold leading-6 text-gray-900'>
              Profile
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Edit your information
            </p>
            <div className='mt-5 flex flex-col gap-y-3'>
              <Input
                label='Name'
                id='name'
                register={register}
                errors={errors}
                required
                disabled={isLoading}
              />
              <div>
                <label className='mb-1 mt-2 block text-sm font-medium leading-9 text-gray-900'>
                  Photo
                </label>
                <div className='flex items-center gap-x-3 '>
                  <div className='relative inline-block h-14 w-14 overflow-hidden rounded-full object-cover'>
                    <Image
                      alt='Avatar'
                      fill
                      src={
                        image || currentUser?.image || '/images/placeholder.jpg'
                      }
                    />
                  </div>
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset='vtil6eih'
                  >
                    <Button disabled={isLoading} secondary type='button'>
                      Upload
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-6 flex items-center justify-end'>
          <Button disabled={isLoading} type='submit'>
            Save
          </Button>
          <Button disabled={isLoading} secondary onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
