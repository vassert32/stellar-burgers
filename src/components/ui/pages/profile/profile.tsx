import { FC } from 'react';
import { Button, Input } from '@zlden/react-developer-burger-ui-components';
import styles from './profile.module.css';
import commonStyles from '../common.module.css';

import { ProfileUIProps } from './type';
import { ProfileMenu } from '@components';

export const ProfileUI: FC<ProfileUIProps> = ({
  formValue,
  isFormChanged,
  updateUserError,
  handleSubmit,
  handleCancel,
  handleInputChange
}) => {
  return (
    <main className={commonStyles.container}>
      <div className={`mt-30 mr-15 ${styles.menu}`}>
        <ProfileMenu />
      </div>
      <form
        onSubmit={handleSubmit}
        className={`mt-30 ${styles.form} ${commonStyles.form}`}
      >
        <div className='pb-6'>
          <Input
            name='name'
            type='text'
            placeholder='Имя'
            value={formValue.name}
            onChange={handleInputChange}
            icon='EditIcon'
            size='default'
            error={false}
            errorText=''
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>

        <div className='pb-6'>
          <Input
            name='email'
            type='email'
            placeholder='E-mail'
            value={formValue.email}
            onChange={handleInputChange}
            icon='EditIcon'
            size='default'
            error={false}
            errorText=''
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>

        <div className='pb-6'>
          <Input
            name='password'
            type='password'
            placeholder='Пароль'
            value={formValue.password}
            onChange={handleInputChange}
            icon='EditIcon'
            size='default'
            error={false}
            errorText=''
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>

        {isFormChanged && (
          <div className={styles.button}>
            <Button
              htmlType='button'
              type='secondary'
              size='medium'
              onClick={handleCancel}
            >
              Отменить
            </Button>
            <Button htmlType='submit' type='primary' size='medium'>
              Сохранить
            </Button>
          </div>
        )}

        {!!updateUserError && (
          <p className={`${commonStyles.error} pt-5 text text_type_main-default`}>
            {updateUserError}
          </p>
        )}
      </form>
    </main>
  );
};