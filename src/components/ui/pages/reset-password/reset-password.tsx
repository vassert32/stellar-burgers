import { FC } from 'react';
import {
  PasswordInput,
  Input,
  Button
} from '@zlden/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from '../common.module.css';
import { ResetPasswordUIProps } from './type';

export const ResetPasswordUI: FC<ResetPasswordUIProps> = ({
  password,
  setPassword,
  token,
  setToken,
  handleSubmit,
  errorText
}) => {
  return (
    <main className={styles.container}>
      <section className={`pt-6 ${styles.wrapCenter}`}>
        <h3 className='text text_type_main-medium pb-6'>Восстановление пароля</h3>

        <form className={`${styles.form} pb-15`} onSubmit={handleSubmit} name='reset-password'>
          <div className='pb-6'>
            <PasswordInput
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='pb-6'>
            <Input
              type='text'
              name='token'
              placeholder='Введите код из письма'
              value={token}
              onChange={(e) => setToken(e.target.value)}
              error={false}
              errorText=''
              size='default'
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          </div>

          <div className={`pb-6 ${styles.button}`}>
            <Button type='primary' size='medium' htmlType='submit'>
              Сохранить
            </Button>
          </div>

          {errorText && (
            <p className={`${styles.error} text text_type_main-default pb-6`}>
              {errorText}
            </p>
          )}
        </form>

        <div className={`${styles.question} text text_type_main-default pb-6`}>
          Вспомнили пароль?
          <Link to='/login' className={`pl-2 ${styles.link}`}>
            Войти
          </Link>
        </div>
      </section>
    </main>
  );
};