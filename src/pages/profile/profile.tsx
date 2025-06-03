// src/pages/profile/profile.tsx
import React, { FC, useEffect, useState, SyntheticEvent } from 'react';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { getProfile, updateProfile } from '../../services/slices/slice-user';
import { ProfileUI } from '../../components/ui/pages/profile/profile';

interface TFormState {
  email: string;
  name: string;
  password: string;
}

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const { data, isLoading, errorMessage } = useSelector((state: RootState) => state.user);

  const [formState, setFormState] = useState<TFormState>({
    email: '',
    name: '',
    password: ''
  });

  const [error, setErrorMessage] = useState('');

  useEffect(() => {
    if (data) {
      setFormState({
        name: data.name,
        email: data.email,
        password: ''
      });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  const hasChanges =
    formState.name !== data?.name ||
    formState.email !== data?.email ||
    formState.password.length > 0;

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const { name, email, password } = formState;
    dispatch(updateProfile({ name, email, password: password || undefined })).then((action) => {
      if (!('error' in action)) {
        setFormState((prev) => ({ ...prev, password: '' }));
      }
    });
  };

  const onCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (data) {
      setFormState({
        name: data.name,
        email: data.email,
        password: ''
      });
      setErrorMessage('');
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading && !data) {
    return (
      <ProfileUI
        isFormChanged={false}
        formValue={formState}
        handleCancel={() => {}}
        handleSubmit={() => {}}
        handleInputChange={() => {}}
      />
    );
  }

  return (
    <ProfileUI
      formValue={formState}
      isFormChanged={hasChanges}
      handleCancel={onCancel}
      handleSubmit={onSubmit}
      handleInputChange={onChange}
    />
  );
};