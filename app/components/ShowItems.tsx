import { OrderItem } from "@/interface/userInterface";
import { RefreshCcwDot, Trash } from "lucide-react";
import React from "react";

interface ShowItemsProps {
  items: OrderItem[];
  setOpen: (value: boolean) => void;
  setSelectedItemId: (id: string) => void;
  setShowDeleteModal: (value: boolean) => void;
}

const ShowItems: React.FC<ShowItemsProps> = ({
  items,
  setOpen,
  setSelectedItemId,
  setShowDeleteModal,
}) => {
  return (
    <div className="mx-auto p-6 overflow-auto rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Inventory</h2>
      {items.length > 0 ? (
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-smm font-semibold text-left">
                Product Name
              </th>
              <th className="p-3 text-smm font-semibold text-left">
                Company Name
              </th>
              <th className="p-3 text-smm font-semibold text-left">
                Order When
              </th>
              <th className="p-3 text-smm font-semibold text-left">Quantity</th>
              <th className="p-3 text-smm font-semibold text-left">Update</th>
              <th className="p-3 text-smm font-semibold text-left">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item: OrderItem) => (
              <tr key={item._id} className="hover:bg-gray-50 even:bg-gray-50">
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {item.productName}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {item.supplierName}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {item.orderWhen}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {item.quantity}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <button className="bg-yellow-300 cursor-pointer p-2 rounded-lg font-bold">
                    <RefreshCcwDot size={20} />
                  </button>
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <button
                    className="bg-red-600 cursor-pointer p-2 rounded-lg font-bold text-white"
                    onClick={() => {
                      setSelectedItemId(item._id as string);
                      setShowDeleteModal(true);
                    }}
                  >
                    <Trash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600 mt-4">Your inventory is empty</p>
      )}
    </div>
  );
};

export default ShowItems;
