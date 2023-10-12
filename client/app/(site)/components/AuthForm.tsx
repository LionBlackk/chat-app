'use client';
import axios from 'axios';
import Button from '@/app/components/Button';
import Input from '@/app/components/input/Input';
import { useCallback, useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import AuthSocialButton from './AuthSocialButton';
import { BsGoogle, BsGithub } from 'react-icons/bs';
type Variant = 'LOGIN' | 'REGISTER';
const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      axios.post('/api/register', data);
    }

    if (variant === 'LOGIN') {
      //NextAuth Sign in
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    //NextAuth social sign in
  };

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input
              id='name'
              label='Name'
              register={register}
              errors={errors}
            ></Input>
          )}
          <Input
            id='email'
            label='Email address'
            register={register}
            errors={errors}
          ></Input>
          <Input
            id='password'
            label='Password'
            register={register}
            errors={errors}
          ></Input>
          <div>
            <Button disabled={isLoading} fullWidth type='submit'>
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>

        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='bg-white px-2 text-gray-500'>
                Or continue with
              </span>
            </div>
          </div>
          <div className='mt-6 flex gap-2'>
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction('github')}
            ></AuthSocialButton>
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction('google')}
            ></AuthSocialButton>
          </div>
        </div>

        <div className='mt-6 flex justify-center gap-2 text-sm text-gray-500'>
          <div>
            {variant === 'LOGIN'
              ? 'New to messenger'
              : 'Already have an account?'}
          </div>
          <div onClick={toggleVariant} className='cursor-pointer underline'>
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
