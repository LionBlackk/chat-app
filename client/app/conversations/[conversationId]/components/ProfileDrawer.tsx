'use client';
import Avatar from '@/app/components/Avatar';
import Modal from '@/app/components/Modal';
import useOtherUser from '@/app/hooks/useOtherUser';
import { Transition, Dialog } from '@headlessui/react';
import { Conversation, User } from '@prisma/client';
import { format } from 'date-fns';
import { Fragment, useMemo, useState } from 'react';
import { IoClose, IoTrash } from 'react-icons/io5';
import ConfirmModal from './ConfirmModal';
import AvatarGroup from '@/app/components/AvatarGroup';
interface ProfileDrawerProps {
  data: Conversation & {
    users: User[];
  };
  isOpen: boolean;
  onClose: () => void;
}
const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const otherUser = useOtherUser(data);
  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);
  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    return 'Active';
  }, [data.users]);
  const joinedDate = useMemo(() => {
    return format(new Date(data.createdAt), 'PP');
  }, [data.createdAt]);
  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-500'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-500'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/40' />
          </Transition.Child>
          {/* <div
          className='
            fixed
            inset-0
            overflow-hidden
          '
        >
          <div
            className='
              absolute
              inset-0
              overflow-hidden
            '
          > */}
          <div
            className='
            pointer-events-none
            fixed
            inset-y-0
            right-0
            flex
            max-w-full
            pl-10
          '
          >
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-500'
              enterFrom='translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-500'
              leaveFrom='translate-x-0'
              leaveTo='translate-x-full'
            >
              <Dialog.Panel
                className='
                pointer-events-auto
                w-screen
                max-w-md
              '
              >
                <div
                  className='
                  flex
                  h-full
                  flex-col
                  overflow-y-scroll
                  bg-white
                  py-6
                  shadow-xl
                '
                >
                  <div
                    className='
                    w-full
                    px-4 sm:px-6
                '
                  >
                    <div className='flex h-7 w-full items-center justify-end'>
                      {/* <div className='flex h-7 w-full justify-end'> */}
                      <button
                        onClick={onClose}
                        className='
                        rounded-md
                        bg-white
                        text-gray-400
                        hover:text-gray-500
                        focus:outline-none
                        focus:ring-2
                        focus:ring-sky-500
                        focus:ring-offset-2
                      '
                      >
                        <IoClose size={24} />
                      </button>
                      {/* </div> */}
                    </div>
                  </div>
                  <div
                    className='
                    relative
                    mt-6
                    flex-1 px-4 
                    sm:px-6
                  '
                  >
                    <div
                      className='
                      flex
                      flex-col
                      items-center
                      justify-center
                    '
                    >
                      <div className='mb-2'>
                        {data.isGroup ? (
                          <AvatarGroup users={data.users} />
                        ) : (
                          <Avatar user={otherUser} />
                        )}
                      </div>
                      <div>{title}</div>
                      <div className='text-sm text-gray-500'>{statusText}</div>
                      <div className='my-8 flex gap-10'>
                        <div
                          onClick={() => setConfirmOpen(() => true)}
                          className='
                          flex cursor-pointer flex-col
                          items-center gap-3
                          hover:opacity-75
                        '
                        >
                          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 transition'>
                            <IoTrash size={20} />
                          </div>
                          <div className='text-sm font-light text-neutral-600'>
                            Delete
                          </div>
                        </div>
                      </div>
                      <div className='w-full pb-5 pt-5 sm:px-0 sm:pt-0'>
                        <dl className='space-y-8 px-4 sm:space-y-6 sm:px-6'>
                          {data.isGroup && (
                            <div>
                              <dt className='flex-shrink-0 text-sm font-medium text-gray-500 sm:w-40'>
                                Emails
                              </dt>
                              <dd className='mt-1 text-sm text-gray-900'>
                                {data.users
                                  .map((user) => user.email)
                                  .join(', ')}
                              </dd>
                            </div>
                          )}
                          {!data.isGroup && (
                            <div>
                              <dt
                                className='
                                  text-sm
                                  font-medium
                                  text-gray-500
                                  sm:w-40
                                  sm:flex-shrink-0
                                '
                              >
                                Email
                              </dt>
                              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
                                {otherUser.email}
                              </dd>
                            </div>
                          )}
                          {!data.isGroup && (
                            <>
                              <hr></hr>
                              <div>
                                <dt className='sm:flex-shink-0 text-sm font-medium text-gray-500 sm:w-40'>
                                  Joined
                                </dt>
                                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
                                  <time dateTime={joinedDate}>
                                    {joinedDate}
                                  </time>
                                </dd>
                              </div>
                            </>
                          )}
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
          {/* </div>
        </div> */}
        </Dialog>
      </Transition.Root>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(() => false)}
      />
    </>
  );
};

export default ProfileDrawer;
