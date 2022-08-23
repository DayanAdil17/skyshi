import { PriorityEnum } from '@/types';

export const todoPriortyConfig = {
  [PriorityEnum['Very High']]: 'bg-[#ED4C5C]',
  [PriorityEnum.High]: 'bg-[#F8A541]',
  [PriorityEnum.Medium]: 'bg-[#00A790]',
  [PriorityEnum.Low]: 'bg-[#428BC1]',
  [PriorityEnum['Very Low']]: 'bg-[#8942C1]',
};

export interface TodoPriorityProps {
  type: string;
}

export default function TodoPriority({ type }: TodoPriorityProps) {
  return (
    <div
      p="y-1 x-1"
      className={`${todoPriortyConfig[type as PriorityEnum]} rounded-full`}
    ></div>
  );
}
