import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { useNavigate } from 'react-router-dom';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from '@store';
import { loginUserThunk as submitLogin, clearUserError as resetError } from '@slices';

export const Login: FC = () => {
  const send = useAppDispatch();
  const nav = useNavigate();

  const loginError = useAppSelector((s) => s.user.error);
  const [userEmail, updateEmail] = useState('');
  const [userPassword, updatePassword] = useState('');

  useEffect(() => {
    send(resetError());
  }, [send]);

  const onLogin = (evt: SyntheticEvent) => {
    evt.preventDefault();
    send(submitLogin({ email: userEmail, password: userPassword }));
  };

  return (
    <LoginUI
      errorText={loginError?.toString()}
      email={userEmail}
      setEmail={updateEmail}
      password={userPassword}
      setPassword={updatePassword}
      handleSubmit={onLogin}
    />
  );
};
