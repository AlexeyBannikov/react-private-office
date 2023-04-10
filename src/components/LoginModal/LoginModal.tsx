import React from 'react';
import hide from '../../assets/icons/hide.png';
import show from '../../assets/icons/show.png';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';
import { IUser } from '../../@types/user';
import { loginValidation, passwordValidation } from '../../utils/validations';

interface ILoginModal {
  setShowModal: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const LoginModal: React.FC<ILoginModal> = ({ setShowModal }) => {
  const [formValues, setFormValues] = React.useState<IUser>({
    login: '',
    password: '',
  });
  const [formDirty, setFormDirty] = React.useState({
    login: false,
    password: false,
  });
  const formValid = loginValidation(formValues.login) && passwordValidation(formValues.password);
  const [passHidden, setPassHidden] = React.useState(true);
  const loginInputRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    loginInputRef?.current?.focus();
  }, []);

  const formValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const formDirtyHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setFormDirty({ ...formDirty, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formValid) {
      if (localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user')!);

        if (formValues.login === user?.login && formValues.password === user?.password) {
          localStorage.setItem('loggedin', true.toString());
          navigate('/private-office');
        } else {
          alert('Неправильный логин или пароль');
        }
      } else {
        localStorage.setItem('user', JSON.stringify(formValues));
        localStorage.setItem('loggedin', true.toString());
        navigate('/private-office');
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormValues({ login: '', password: '' });
    setFormDirty({ login: false, password: false });
  };

  return (
    <Modal closeModal={closeModal}>
      <form
        className='form'
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          e.key === 'Enter' && handleSubmit(e);
        }}>
        <button
          className='absolute top-[8px] right-[16px] hover:text-gray-300'
          onClick={closeModal}>
          X
        </button>
        <input
          type='text'
          name='login'
          value={formValues.login}
          onChange={formValueHandler}
          onBlur={formDirtyHandler}
          placeholder='login'
          ref={loginInputRef}
        />
        <div className='relative'>
          <input
            type={passHidden ? 'password' : 'text'}
            name='password'
            value={formValues.password}
            onChange={formValueHandler}
            onBlur={formDirtyHandler}
            placeholder='password'
          />
          <img
            src={passHidden ? show : hide}
            alt='Password status'
            className='w-[24px] h-[24px] absolute top-1/4 right-[8px] cursor-pointer opacity-50'
            onClick={() => setPassHidden(!passHidden)}
          />
        </div>
        <div className='error'>
          <div>
            {formDirty.login &&
              !loginValidation(formValues.login) &&
              'Логин не может быть меньше 3 символов или содержать только пробелы'}
          </div>
          <div>
            {formDirty.password &&
              !passwordValidation(formValues.password) &&
              'Пароль не может быть меньше 3 символов или содержать только пробелы'}
          </div>
        </div>
        <button
          disabled={formValid ? false : true}
          className={`modal__button ${!formValid && 'disabled__button'}`}
          type='submit'>
          Зарегистрироваться/Войти
        </button>
      </form>
    </Modal>
  );
};

export default LoginModal;
