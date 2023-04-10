import React from 'react';
import deviceOn from '../../assets/icons/device-on.svg';
import deviceOff from '../../assets/icons/device-off.svg';
import AddDeviceModal from '../../components/AddDeviceModal/AddDeviceModal';
import { IDevice } from '../../@types/device';
import list from '../../assets/icons/list.svg';
import table from '../../assets/icons/table.svg';

const DevicesPage: React.FC = () => {
  const [listView, setListView] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const [devices, setDevices] = React.useState<IDevice[]>(() => {
    const savedDevices = localStorage.getItem('devices');

    if (savedDevices) {
      return JSON.parse(savedDevices);
    } else {
      return [];
    }
  });

  React.useEffect(() => {
    localStorage.setItem('devices', JSON.stringify(devices));
  }, [devices]);

  const addDevice = (name: string) => {
    const newDevice: IDevice = {
      id: Date.now(),
      name,
      isEnabled: false,
    };

    setDevices([newDevice, ...devices]);
  };

  const removeDevice = (id: number) => {
    setDevices([...devices.filter((device) => device.id !== id)]);
  };

  const handleToggle = (id: number) => {
    setDevices([
      ...devices.map((device) =>
        device.id === id ? { ...device, isEnabled: !device.isEnabled } : { ...device }
      ),
    ]);
  };

  return (
    <div className='text-center relative'>
      <button
        className='common__button py-[10px] px-[20px] mb-[20px]'
        onClick={() => setShowModal(true)}>
        Добавить устройство
      </button>
      <div className='absolute top-0 right-0'>
        <img
          src={listView ? table : list}
          alt='List view'
          className='w-[24px] h-[24px]  cursor-pointer'
          onClick={() => setListView(!listView)}
        />
      </div>
      <ul
        className={
          listView
            ? 'flex flex-col gap-[8px]'
            : 'grid grid-cols-4 gap-[10px] max-[850px]:grid-cols-3 max-[590px]:grid-cols-2'
        }>
        {devices.map((device) => (
          <li
            key={device.id}
            className={
              listView
                ? 'flex justify-between bg-gray-700 rounded-[8px] p-[10px]'
                : 'flex flex-col items-center bg-gray-700 rounded-[8px] p-[10px]'
            }>
            <div>{device.name}</div>
            <div className={listView ? 'flex items-center gap-[10px]' : ''}>
              <div
                className='flex items-center gap-[10px] cursor-pointer'
                onClick={() => handleToggle(device.id)}>
                <span>{device.isEnabled ? 'Включено' : 'Выключено'}</span>
                <img
                  className='w-[24px] h-[24px]'
                  src={device.isEnabled ? deviceOn : deviceOff}
                  alt='Device status'
                />
              </div>
              <button onClick={() => removeDevice(device.id)}>X</button>
            </div>
          </li>
        ))}
      </ul>
      {showModal && <AddDeviceModal setShowModal={setShowModal} addDevice={addDevice} />}
    </div>
  );
};

export default DevicesPage;
