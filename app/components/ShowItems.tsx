import { OrderItem } from "@/interface/userInterface";
import React from "react";

const ShowItems = ({ items, setOpen }: any) => {
  return (
    <div className="mx-auto p-6 overflow-auto rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Inventory</h2>
      {items.length > 0 ? (
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="w-34 whitespace-nowrap p-3 text-smm font-semibold tracking-wide text-left">
                Product Name
              </th>
              <th className="w-37 whitespace-nowrap p-3 text-smm font-semibold tracking-wide text-left">
                Company Name
              </th>
              <th className="w-34 whitespace-nowrap p-3 text-smm font-semibold tracking-wide text-left">
                Order When
              </th>
              <th className="w-34 whitespace-nowrap p-3 text-smm font-semibold tracking-wide text-left">
                Quantity
              </th>
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
