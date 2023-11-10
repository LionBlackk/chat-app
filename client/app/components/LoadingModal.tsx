'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ClipLoader } from 'react-spinners';

const LoadingModal = () => {
  return (
    <Transition.Root show as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={() => {}}>
        <Transition.Child
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-50/20 transition-opacity'></div>
        </Transition.Child>
        <div className='fixed inset-0 z-10'>
          <div className='flex min-h-full items-center justify-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel>
                <ClipLoader size={40} color='#0284c7' />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default LoadingModal;
