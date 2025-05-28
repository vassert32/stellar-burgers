import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from '@store';
import {
  registerUserThunk as signUpThunk,
  clearUserError as resetUserError,
  getUserErrorSelector as selectError
} from '@slices';

export const Register: FC = () => {
  const send = useAppDispatch();
  const errorMessage = useAppSelector(selectError);

  const [nameValue, updateName] = useState('');
  const [emailValue, updateEmail] = useState('');
  const [passValue, updatePassword] = useState('');

  const onSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();
    send(signUpThunk({ email: emailValue, name: nameValue, password: passValue }));
  };

  useEffect(() => {
    send(resetUserError());
  }, [send]);

  return (
    <RegisterUI
      errorText={errorMessage?.toString()}
      email={emailValue}
      userName={nameValue}
      password={passValue}
      setEmail={updateEmail}
      setPassword={updatePassword}
      setUserName={updateName}
      handleSubmit={onSubmit}
    />
  );
};
