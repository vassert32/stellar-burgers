import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ResetPasswordUI } from '@ui-pages';

import { useDispatch as useAppDispatch, useSelector as useAppSelector } from '@store';
import {
  resetPasswordThunk as submitReset,
  getUserErrorSelector as selectError,
  clearUserError as resetError
} from '@slices';

export const ResetPassword: FC = () => {
  const nav = useNavigate();
  const send = useAppDispatch();

  const [newPassword, updatePassword] = useState('');
  const [codeToken, updateToken] = useState('');
  const errorMessage = useAppSelector(selectError) as string;

  const onResetSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();
    send(submitReset({ password: newPassword, token: codeToken })).then((res) => {
      if (res.payload) {
        localStorage.removeItem('resetPassword');
        nav('/login');
      }
    });
  };

  useEffect(() => {
    send(resetError());
  }, [send]);

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      nav('/forgot-password', { replace: true });
    }
  }, [nav]);

  return (
    <ResetPasswordUI
      errorText={errorMessage}
      password={newPassword}
      token={codeToken}
      setPassword={updatePassword}
      setToken={updateToken}
      handleSubmit={onResetSubmit}
    />
  );
};
