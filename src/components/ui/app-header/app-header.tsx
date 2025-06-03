import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const linkClass = (isActive: boolean) =>
    [
      styles.link,
      'text text_type_main-default',
      'ml-2',
      'mr-10',
      isActive ? styles.link_active : ''
    ].join(' ');

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink to='/' end className={({ isActive }) => linkClass(isActive)}>
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
              </>
            )}
          </NavLink>

          <NavLink to='/feed' className={({ isActive }) => linkClass(isActive)}>
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <p className='text text_type_main-default ml-2'>Лента заказов</p>
              </>
            )}
          </NavLink>
        </div>

        <div className={styles.logo}>
          <NavLink to='/' className={styles.logoLink}>
            <Logo className={styles.logoIcon} />
          </NavLink>
        </div>

        <div className={styles.link_position_last}>
          <NavLink to='/profile' className={({ isActive }) => linkClass(isActive)}>
            {({ isActive }) => (
              <>
                <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                <p className='text text_type_main-default ml-2'>
                  {userName || 'Личный кабинет'}
                </p>
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};