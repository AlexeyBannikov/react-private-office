import React from 'react';
import LoginModal from '../../components/LoginModal/LoginModal';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);

  const login = () => {
    if (localStorage.getItem('loggedin')) {
      navigate('/private-office');
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-primary'>
      <button
        className='common__button px-[48px] py-[12px] text-[36px] max-[590px]:text-[20px] '
        onClick={login}>
        Войти в личный кабинет
      </button>
      {showModal && <LoginModal setShowModal={setShowModal} />}
    </div>
  );
};

export default HomePage;
