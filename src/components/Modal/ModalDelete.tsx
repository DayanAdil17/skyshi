import Button from '@components/Button';
import DangerSign from '@components/Icon/DangerSign';

export interface ModalDeleteProps {
  closeModal: (_?: any) => void;
  title: string;
  handleDelete: () => void;
  type?: 'activity' | 'list';
}

export default function ModalDelete({
  title,
  closeModal,
  handleDelete,
  type = 'activity',
}: ModalDeleteProps) {
  const text = {
    activity: 'Apakah anda yakin menghapus activity',
    list: 'Apakah anda yakin menghapus List Item',
  };

  return (
    <>
      <div
        flex="~ col"
        justify="center"
        align="items-center"
        data-cy="todo-modal-delete"
      >
        <div p="y-8" data-cy="todo-modal-delete-warning-sign">
          <DangerSign />
        </div>
        <span>{text[type]}</span>
        <span font="bold">“{title}”?</span>
      </div>
      <div
        className="flex justify-center space-x-6"
        data-cy="todo-modal-delete-batal-button"
      >
        <div className="mt-4" data-cy="modal-delete-cancel-button">
          <Button text="Batal" type="cancel" onClick={closeModal} />
        </div>

        <div className="m-[15px]" data-cy="activity-item-delete-button">
          <Button text="Hapus" type="approve" onClick={handleDelete} />
        </div>
      </div>
    </>
  );
}
