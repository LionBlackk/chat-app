'use client';
import Avatar from '@/app/components/Avatar';
import { FullMessageType } from '@/app/types';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ImageModal from './ImageModal';
import axios from 'axios';
import { AiOutlineFile } from 'react-icons/ai';

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}
const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();
  const [isOpenModalImage, setIsOpenModalImage] = useState(false);

  const [fileData, setFileData] = useState(null);
  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const id = data.file.split('/').pop();
        const response = await axios.post(`/api/upload`, { id: id });
        setFileData(response.data); // Giả sử server trả về dữ liệu của file
      } catch (error) {
        console.error('Error fetching file data:', error);
      }
    };

    if (data.file) {
      fetchFileData();
    }
  }, [data.file]);

  const isOwn = data.sender.email === session.data?.user?.email;

  const seenList = (data.seen || [])
    .filter((user) => user.email !== data.sender.email)
    .map((user) => user.name)
    .join(', ');

  const container = clsx('flex p-4 gap-3', isOwn && 'justify-end');

  const body = clsx('flex flex-col gap-2', isOwn && 'items-end');

  const avatar = clsx(isOwn && 'order-2');

  const message = clsx(
    `
    text-sm w-fit overflow-hidden`,
    isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
    data.image ? 'rounded-lg p-0' : 'rounded-full py-2 px-3'
  );

  const handleFileSize = (size: number) => {
    const KB = 1024;
    const MB = KB * KB;
    if (size < KB) {
      return `${size} B`;
    } else if (size < MB) {
      return `${(size / KB).toFixed(2)} KB`;
    } else if (size > MB) {
      return `${(size / MB).toFixed(2)} MB`;
    }
  };
  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className='flex items-center gap-1'>
          <div className='text-sm text-gray-500'>{data.sender.name}</div>
          <div className='text-sm text-gray-400'>
            {format(new Date(data.createdAt), 'p')}
          </div>
        </div>
        {data.body || data.image ? (
          <div className={message}>
            <ImageModal
              src={data.image}
              isOpen={isOpenModalImage}
              onClose={() => setIsOpenModalImage(false)}
            />
            {data.image ? (
              <Image
                alt='Image'
                height='288'
                width='288'
                onClick={() => setIsOpenModalImage(true)}
                src={data.image}
                className='translate cursor-pointer object-cover transition hover:scale-110'
              />
            ) : (
              <div>{data.body}</div>
            )}
          </div>
        ) : null}
        {data.file ? (
          <div className='w-fit rounded-xl bg-[#F0F0F0] px-3 py-2 text-sm'>
            <a target='_blank' href={data.file} rel='noopener noreferrer'>
              <div className='flex items-center'>
                <div className='flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#E4E4E4]'>
                  <AiOutlineFile size={25} className='text-black ' />
                </div>
                <div className='ml-1 flex flex-col gap-y-[6px]'>
                  {fileData && (
                    <div className='ml-3 font-bold text-black'>
                      {fileData?.name}
                    </div>
                  )}
                  {fileData && (
                    <div className='ml-3 text-gray-600'>
                      {fileData?.size && handleFileSize(fileData.size)}
                    </div>
                  )}
                </div>
              </div>
            </a>
          </div>
        ) : null}
        {isLast && isOwn && seenList.length > 0 && (
          <div className='text-xs font-light text-gray-400'>{`Seen by ${seenList}`}</div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
