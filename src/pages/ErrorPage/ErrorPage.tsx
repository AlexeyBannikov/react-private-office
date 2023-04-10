import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const backToHome = () => {
    navigate('/');
  };

  return (
    <div className='text-center text-white bg-primary h-screen w-screen'>
      <span className='text-[64px]'>😕</span>
      <br />
      <h1 className='mb-[8px] mt-0 text-5xl font-medium leading-tight'>Ничего не найдено</h1>
      <p className='text-[22px]'>К сожалению данная страница отсутствует на нашем веб-сайте.</p>
      <button
        className='text-[20px] max-[590px]:text-[18px] common__button py-[10px] px-[20px] mt-[20px]'
        onClick={backToHome}>
        Вернуться на главную
      </button>
    </div>
  );
};

export default ErrorPage;
