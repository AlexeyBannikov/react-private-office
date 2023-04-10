import React from 'react';
import Modal from '../Modal/Modal';
import { IDeviceForm } from '../../@types/device';
import { deviceValidation } from '../../utils/validations';

interface IAddDeviceModal {
  setShowModal: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  addDevice: (name: string) => void;
}

const AddDeviceModal: React.FC<IAddDeviceModal> = ({ setShowModal, addDevice }) => {
  const [formValues, setFormValues] = React.useState<IDeviceForm>({
    name: '',
  });
  const [formDirty, setFormDirty] = React.useState({
    name: false,
  });
  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const formValid = deviceValidation(formValues.name);

  React.useEffect(() => {
    nameInputRef?.current?.focus();
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
      addDevice(formValues.name);
      closeModal();
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormValues({ name: '' });
    setFormDirty({ name: false });
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
          name='name'
          value={formValues.name}
          onChange={formValueHandler}
          onBlur={formDirtyHandler}
          placeholder='Название устройства'
          ref={nameInputRef}
        />
        <div className='error'>
          {formDirty.name &&
            !deviceValidation(formValues.name) &&
            'Пароль не может быть меньше 3 символов или содержать только пробелы'}
        </div>
        <button
          disabled={formValid ? false : true}
          className={`modal__button ${!formValid && 'disabled__button'}`}
          type='submit'>
          Добавить
        </button>
      </form>
    </Modal>
  );
};

export default AddDeviceModal;
