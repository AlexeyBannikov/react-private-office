import React from 'react';
import { passwordValidation } from '../../utils/validations';

const ProfilePage = () => {
  const [formValues, setFormValues] = React.useState({
    lastPassword: '',
    newPassword: '',
  });
  const [formDirty, setFormDirty] = React.useState({
    lastPassword: false,
    newPassword: false,
  });
  const user = JSON.parse(localStorage.getItem('user')!);
  const formValid =
    passwordValidation(formValues.newPassword) && formValues.lastPassword === user.password;

  const formValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const formDirtyHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setFormDirty({ ...formDirty, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formValid) {
      if (formValues.lastPassword === user.password) {
        localStorage.setItem('user', JSON.stringify({ ...user, password: formValues.newPassword }));
        setFormValues({ lastPassword: '', newPassword: '' });
        setFormDirty({ lastPassword: false, newPassword: false });
      }
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <span className='mb-[20px]'>Имя пользователя - {user.login}</span>

      <form onSubmit={handleSubmit} className='gap-[8px] w-1/2 flex flex-col'>
        <input
          type='text'
          name='lastPassword'
          value={formValues.lastPassword}
          onChange={formValueHandler}
          onBlur={formDirtyHandler}
          placeholder='Старый пароль'
        />
        <input
          type='text'
          name='newPassword'
          value={formValues.newPassword}
          onChange={formValueHandler}
          onBlur={formDirtyHandler}
          placeholder='Новый пароль'
        />
        <div className='error'>
          <div>
            {formDirty.lastPassword &&
              !(formValues.lastPassword === user.password) &&
              'Неверный пароль'}
          </div>
          <div>
            {formDirty.newPassword &&
              !passwordValidation(formValues.newPassword) &&
              'Пароль не может быть меньше 3 символов или содержать только пробелы'}
          </div>
        </div>
        <button
          disabled={formValid ? false : true}
          className={`py-[10px] common__button ${!formValid && 'disabled__button'}`}
          type='submit'>
          Изменить пароль
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
