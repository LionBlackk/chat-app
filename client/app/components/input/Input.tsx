import clsx from 'clsx';
import React from 'react';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';
interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}
const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className='block text-sm font-medium leading-6 text-gray-900'
      >
        {label}
      </label>
      <div className='mt-2'>
        <input
          id={id}
          type={type}
          disabled={disabled}
          autoComplete={id}
          {...register(id, { required })}
          className={clsx(
            `
            form-input
            block
            w-full 
            rounded-lg
            border-0
            py-1.5
            text-gray-900
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-sky-600
            sm:text-sm
            sm:leading-6`,
            errors[id] && 'focus:ring-rose-500',
            disabled && 'cursor-default opacity-50'
          )}
        ></input>
      </div>
    </div>
  );
};

export default Input;
