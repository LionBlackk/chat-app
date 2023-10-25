import clsx from 'clsx';
import Link from 'next/link';

interface MobileItemProps {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}
const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  return (
    <Link
      href={href}
      className={clsx(
        `
        flex
        w-full
        items-center
        justify-center
        p-4
        text-sm
        leading-6
        text-gray-500
        hover:bg-gray-100
        hover:text-black
      `,
        active && 'bg-gray-100 text-black'
      )}
    >
      <Icon className='h-6 w-6 shrink-0'></Icon>
    </Link>
  );
};

export default MobileItem;
