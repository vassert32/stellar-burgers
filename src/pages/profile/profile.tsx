import { ProfileUI } from '@ui-pages';
import { FC, useState, useEffect, SyntheticEvent, ChangeEvent } from 'react';
import { useSelector as useAppSelector, useDispatch as useAppDispatch } from '@store';
import { getUserSelector as selectUser, updateUserThunk as applyUserUpdate } from '@slices';
import { TUser } from '@utils-types';

export const Profile: FC = () => {
  const send = useAppDispatch();
  const currentUser = useAppSelector(selectUser) as TUser;

  const [inputs, setInputs] = useState({
    name: currentUser.name,
    email: currentUser.email,
    password: ''
  });

  useEffect(() => {
    setInputs((prev) => ({
      ...prev,
      name: currentUser?.name || '',
      email: currentUser?.email || ''
    }));
  }, [currentUser]);

  const hasChanges =
    inputs.name !== currentUser?.name ||
    inputs.email !== currentUser?.email ||
    Boolean(inputs.password);

  const onFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    send(applyUserUpdate(inputs));
    setInputs({
      ...currentUser,
      password: ''
    });
  };

  const onFormCancel = (event: SyntheticEvent) => {
    event.preventDefault();
    setInputs({
      name: currentUser.name,
      email: currentUser.email,
      password: ''
    });
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={inputs}
      isFormChanged={hasChanges}
      handleCancel={onFormCancel}
      handleSubmit={onFormSubmit}
      handleInputChange={onInputChange}
    />
  );
};
