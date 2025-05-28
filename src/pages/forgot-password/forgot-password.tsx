import { FC, useState, useEffect, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';

import { useSelector as useAppSelector, useDispatch as useAppDispatch } from '@store';
import {
  forgotPasswordThunk as requestPasswordReset,
  getUserErrorSelector as selectUserError,
  clearUserError as resetUserError
} from '@slices';

export const ForgotPassword: FC = () => {
  const [inputEmail, updateEmail] = useState('');
  const errorMessage = useAppSelector(selectUserError) as string;
  const nav = useNavigate();
  const send = useAppDispatch();

  useEffect(() => {
    send(resetUserError());
  }, [send]);

  const onSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();

    send(requestPasswordReset({ email: inputEmail })).then((response) => {
      if (response.payload) {
        localStorage.setItem('resetPassword', 'true');
        nav('/reset-password', { replace: true });
      }
    });
  };

  return (
    <ForgotPasswordUI
      errorText={errorMessage}
      email={inputEmail}
      setEmail={updateEmail}
      handleSubmit={onSubmit}
    />
  );
};
