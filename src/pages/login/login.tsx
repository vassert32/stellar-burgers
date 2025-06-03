// src/pages/login/login.tsx
import React, { FC, useEffect, useState, FormEvent } from 'react';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/slices/slice-user';
import { LoginUI } from '../../components/ui/pages/login/login';
import { log } from 'console';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { errorMessage } = useSelector((state: RootState) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (errorMessage) {
      setFormError(errorMessage);
    }
  }, [errorMessage]);

  const onFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setFormError('');

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/', { replace: true });
      })
      .catch(() => {
        // Ошибка уже есть в error
      });
  };

  return (
    <LoginUI
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      errorText={formError}
      handleSubmit={onFormSubmit}
    />
  );
};