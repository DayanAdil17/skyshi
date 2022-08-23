export interface ButtonProps {
  icon?: JSX.Element;
  text: string;
  onClick: () => void;
  /* Custom props for style */
  type?: 'primary' | 'cancel' | 'approve';
}

export const buttonConfig = {
  primary: {
    bgColor: 'bg-[#16ABF8] hover:bg-[#1381b8]',
    text: 'text-white',
  },
  cancel: {
    bgColor: 'bg-[#F4F4F4] hover:bg-[#dbd9d9]',
    text: 'text-[#4A4A4A]',
  },
  approve: {
    bgColor: 'bg-[#ED4C5C] hover:bg-[#c93847]',
    text: 'text-[#FFFFFF]',
  },
};

export default function Button({
  text,
  icon,
  onClick,
  type = 'primary',
}: ButtonProps) {
  return (
    <button
      className={`${buttonConfig[type].bgColor} ${buttonConfig[type].text}`}
      flex="inline"
      p="y-2 x-6"
      border="rounded rounded-full"
      align="items-center"
      font="bold"
      space="x-1"
      onClick={onClick}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}
