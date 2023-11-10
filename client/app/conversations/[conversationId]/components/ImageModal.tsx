'use client';

import Modal from '@/app/components/Modal';
import Image from 'next/image';

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src: string | null;
}
const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  if (!src) {
    return null;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='h-[400px] w-[400px]'>
        <Image alt='Image' src={src} fill className='object-cover' />
      </div>
    </Modal>
  );
};

export default ImageModal;
