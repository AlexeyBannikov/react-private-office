import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ITabs } from '../../@types/tabs';

const tabs: ITabs[] = [
  { id: 1, title: 'Главная', link: '' },
  { id: 2, title: 'Устройства', link: 'devices' },
  { id: 3, title: 'Профиль', link: 'profile' },
  { id: 4, title: 'Выйти', link: '/' },
];

const Tabs: React.FC = () => {
  const location = useLocation();
  const param = location.pathname.replace(/\/private-office/g, '').substring(1);

  const [active, setActive] = React.useState(() => {
    if (param) {
      return tabs.filter((tab) => tab.link === param)[0].id;
    } else {
      return 1;
    }
  });

  React.useEffect(() => {
    setActive(tabs.filter((tab) => tab.link === param)[0].id);
  }, [param]);

  const logout = (title: string) => {
    if (title === 'Выйти') {
      localStorage.removeItem('loggedin');
    }
  };

  return (
    <div className='flex justify-center gap-[8px] pt-[20px] px-[20px] max-[590px]:flex-wrap'>
      {tabs.map((tab) => (
        <Link to={tab.link} key={tab.id}>
          <button
            onClick={() => logout(tab.title)}
            className={`${tab.id === active ? 'tab active' : 'tab'}`}>
            {tab.title}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default Tabs;
