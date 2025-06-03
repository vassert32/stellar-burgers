import { FC, FormEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/slices/slice-user';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, errorMessage } = useSelector((state: RootState) => state.user);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState<string>('');

  useEffect(() => {
    if (errorMessage) {
      setErrorText(errorMessage);
    }
  }, [errorMessage]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorText('');
    dispatch(register({ name: userName, email, password }))
      .unwrap()
      .then(() => {
        navigate('/login', { replace: true });
      })
      .catch(() => {
        // Ошибка уже есть в errorText, ничего не делаем
      });
  };

  return (
    <RegisterUI
      errorText={errorText}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};