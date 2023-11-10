'use client';
import { useState } from 'react';
import useRoutes from '@/app/hooks/useRoutes';
import DesktopItem from './DesktopItem';
import { User } from '@prisma/client';
import Avatar from '../Avatar';
import SettingsModal from '../SettingsModal';
interface DesktopSidebarProps {
  currentUser: User;
}
const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <SettingsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        currentUser={currentUser}
      />
      <div
        className='
          hidden
          justify-between
          lg:fixed
          lg:inset-y-0
          lg:left-0
          lg:z-40
          lg:flex
          lg:w-20
          lg:flex-col
          lg:overflow-y-auto
          lg:border-r-[1px]
          lg:bg-white
          lg:pb-4
          xl:px-6
        '
      >
        <nav className='mt-4 flex flex-col items-center justify-center'>
          <ul role='list'>
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                label={item.label}
                href={item.href}
                onClick={item.onClick}
                active={item.active}
                icon={item.icon}
              ></DesktopItem>
            ))}
          </ul>
        </nav>
        <nav className='mt-4 flex flex-col items-center justify-center'>
          <div
            onClick={() => setIsOpen(true)}
            className='cursor-pointer transition-all hover:opacity-75'
          >
            <Avatar user={currentUser}></Avatar>
          </div>
        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
