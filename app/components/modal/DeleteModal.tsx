// modal/DeleteModal.tsx
interface DeleteModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[80%] max-w-md">
        <h1 className="text-lg font-semibold mb-4">
          Are you sure you want to remove the item?
        </h1>
        <div className="flex justify-between">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            No
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteModal;
