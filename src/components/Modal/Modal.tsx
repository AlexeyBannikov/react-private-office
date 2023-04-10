import React from 'react';
import { IModal } from '../../@types/modal';

const Modal: React.FC<IModal> = ({ children, closeModal }) => {
  return (
    <div className='fixed inset-0 flex justify-center items-center'>
      <div className='fixed w-screen h-screen bg-black opacity-50' onClick={closeModal}></div>
      {children}
    </div>
  );
};

export default Modal;
