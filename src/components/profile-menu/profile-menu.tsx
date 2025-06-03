import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { logout } from '../../services/slices/slice-user';
import { ProfileMenuUI } from '@ui';
import { log } from 'console';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleExit = () => {
    dispatch(logout()).then((result) => {
      if ('error' in result) return;

      localStorage.removeItem('refreshToken');
      document.cookie = 'accessToken=; path=/; max-age=0';
      console.info('Пользователь вышел');
      navigate('/login', { replace: true });
    });
  };

  return (
    <ProfileMenuUI
      handleLogout={handleExit}
      pathname={location.pathname}
    />
  );
};