import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { HiFolder } from 'react-icons/hi2';
import { AiOutlineCloseCircle, AiOutlineCloudUpload } from 'react-icons/ai';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
interface UploadFileProps {
  conversationId: string;
}

const UploadFile: React.FC<UploadFileProps> = ({ conversationId }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File>();
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set('file', file);

      const res = await axios.post('/api/upload', data);

      const id = res.data.id;

      axios.post('/api/messages', {
        file: `${process.env.NEXT_PUBLIC_API_URL}/file/${id}`,
        conversationId: conversationId,
      });
      closeModal();
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  return (
    <div>
      <button onClick={openModal}>
        <HiFolder size={30} className='text-sky-500' />
      </button>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel='Example Modal'
      >
        <button onClick={closeModal}>
          <AiOutlineCloseCircle size={30} className='text-sky-500' />
        </button>

        <form onSubmit={onSubmit}>
          <input
            type='file'
            name='file'
            onChange={(e) => setFile(e.target.files?.[0])}
          />
          <button type='submit'>
            <AiOutlineCloudUpload size={30} className='text-sky-500' />
          </button>
        </form>
      </Modal>
    </div>
  );
};
export default UploadFile;
