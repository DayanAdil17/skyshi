export interface ButtonIconProps {
  onClick: (_?: any) => void;
  icon: React.ReactNode;
  type: 'large' | 'medium' | 'small';
}

export const buttonConfig = {
  large: {
    padding: 'p-4',
  },
  medium: {
    padding: 'p-3',
  },
  small: {
    padding: 'p-2',
  },
};

export default function ButtonIcon({
  onClick,
  icon,
  type = 'small',
}: ButtonIconProps) {
  return (
    <button
      onClick={onClick}
      className={`${buttonConfig[type].padding} hover:bg-[#dbd9d9]`}
      border="rounded rounded-full"
    >
      {icon}
    </button>
  );
}
