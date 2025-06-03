import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { getProfile } from '../../services/slices/slice-user';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const tokenExists = document.cookie.includes('accessToken=');

    if (tokenExists && !data && !isLoading) {
      dispatch(getProfile());
    }
  }, [dispatch, data, isLoading]);

  const nameToShow = data?.name ?? '';

  return <AppHeaderUI userName={nameToShow} />;
};