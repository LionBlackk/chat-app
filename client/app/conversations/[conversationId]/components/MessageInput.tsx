'use client';
import { useEffect } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
interface MessageInputProps {
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
  inputRef?: React.Ref<any>;
  value?: string;
  setMessage?: (value: string) => void;
}
const MessageInput: React.FC<MessageInputProps> = ({
  id,
  placeholder,
  required,
  errors,
  register,
  type,
  inputRef,
  value,
  setMessage,
}) => {
  // useEffect(() => {
  //   if (inputRef && inputRef!.current! && value !== undefined) {
  //     inputRef.current.value = value; // Cập nhật giá trị của inputRef khi value thay đổi
  //   }
  // }, [inputRef, value]);
  return (
    <div className='relative w-full'>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete='off'
        {...register(id, { required })}
        value={value}
        onChange={(event) => {
          setMessage && setMessage(event.target.value);
        }}
        ref={inputRef}
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
