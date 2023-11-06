'use client';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
interface MessageInputProps {
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
}
const MessageInput: React.FC<MessageInputProps> = ({
  id,
  placeholder,
  required,
  errors,
  register,
  type,
}) => {
  return (
    <div className='relative w-full'>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={id}
        {...register(id, { required })}
        className='
          w-full
          rounded-full
          bg-neutral-100
          px-3
          py-2
          focus:outline-none
          
        '
      ></input>
    </div>
  );
};

export default MessageInput;
