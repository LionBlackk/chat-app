'use client';

import clsx from 'clsx';
import Link from 'next/link';

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  icon: Icon,
  active,
  href,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li
      className={clsx(
        `
        flex
        items-center
        gap-x-3
        rounded-md 
        p-3
        text-sm
        font-semibold
        leading-6
        text-gray-500
        hover:bg-gray-100
        hover:text-black
    `,
        active && 'bg-gray-100 text-black'
      )}
    >
      <Link href={href} onClick={handleClick}>
        <Icon className='h-6 w-6 shrink-0'></Icon>
        <span className='sr-only'>{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
