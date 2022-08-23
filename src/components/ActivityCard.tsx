import { Activity } from 'src/types';

import { format } from 'date-fns';
import locale from 'date-fns/esm/locale/id/index.js';
import { useState } from 'react';
import { toast } from 'react-toastify';
import AlertSuccess from '@components/Icon/AlertSuccess';
import { axios } from '@config/axios';
import { useNavigate } from 'react-router-dom';
import Modal from '@components/Modal/ModalWrapper';
import ButtonIcon from '@components/Button/ButtonIcon';
import { IoTrashOutline } from 'react-icons/io5';
import ModalDelete from '@components/Modal/ModalDelete';
import Trash from '@components/Icon/Trash';

export interface ActivityCardProps {
  data: Activity;
  refetch: () => void;
}
export default function ActivityCard({
  data: { id, title, created_at },
  refetch,
}: ActivityCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleDelete = async () => {
    const response = await axios.delete(`activity-groups/${id}`);

    if (response.status === 200) {
      refetch();
      setIsOpen(false);
      toast.error('Activity berhasil dihapus', {
        icon: AlertSuccess,
      });
    } else {
      setIsOpen(false);
      toast.error('Gagal menghapus activity', {
        icon: AlertSuccess,
      });
    }
  };

  return (
    <>
      <article
        className="overflow-hidden rounded-lg border"
        h="[234px] full"
        justify="between"
        flex="~ col"
        hover="cursor-pointer"
        onClick={() => navigate(`/activity/${id}`)}
      >
        <div data-cy="activity-title">
          <header className="flex items-center justify-between leading-tight p-2 md:p-4">
            <h1 className="text-lg" font="bold">
              <a className="no-underline hover:underline text-black" href="#">
                {title}
              </a>
            </h1>
          </header>
        </div>

        <footer className="flex items-center justify-between leading-none p-2 md:p-4">
          <div data-cy="activity-date">
            <span>
              {format(new Date(created_at!), 'd MMMM yyyy', {
                locale,
              })}
            </span>
          </div>

          <div data-cy="data-activity-item-delete-button">
            <ButtonIcon onClick={toggleModal} icon={<Trash />} type="medium" />
          </div>
        </footer>
      </article>

      <Modal isOpen={isOpen} closeModal={toggleModal}>
        <ModalDelete
          title={title}
          closeModal={toggleModal}
          handleDelete={handleDelete}
        />
      </Modal>
    </>
  );
}
