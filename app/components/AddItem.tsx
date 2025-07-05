"use client";

import { Camera, ChevronDown, SendHorizontal } from "lucide-react";
import { useState } from "react";

interface AddItemProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface OrderItem {
  productName: string;
  supplierName: string;
  orderWhen: string;
  quantity: string;
  storedLocation: "" | number;
}

const AddItem: React.FC<AddItemProps> = ({ setOpen }) => {
  const [orderItem, setOrderItem] = useState<OrderItem>({
    productName: "",
    supplierName: "",
    orderWhen: "",
    quantity: "",
    storedLocation: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setOrderItem((prev) => ({
      ...prev,
      [name]:
        name === "storedLocation" && value !== "" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { productName, supplierName, orderWhen, quantity, storedLocation } =
        orderItem;
      if (
        !productName ||
        !supplierName ||
        !orderWhen ||
        !quantity ||
        storedLocation === ""
      ) {
        alert("All fields are required");
        return;
      }

      console.log("Form submitted with data:", orderItem);
      const res = await fetch("api/items/addItem", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          productName,
          supplierName,
          orderWhen,
          quantity,
          storedLocation,
        }),
      });

      if (res.ok) {
        setOrderItem({
          productName: "",
          supplierName: "",
          orderWhen: "",
          quantity: "",
          storedLocation: "",
        });

        setOpen(false);
      } else {
        console.log("Item registration failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 shadow-lg bg-zinc-300/10">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Add Item</h1>
        <button
          onClick={() => setOpen(false)}
          type="button"
          className="bg-green-500 font-bold text-white px-6 py-2 rounded hover:bg-green-600 cursor-pointer"
        >
          X
        </button>
      </div>
      <form
        className="flex flex-col items-center gap-3"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full">
          <label htmlFor="productName" className="mb-1 font-medium">
            Item name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            onChange={handleChange}
            value={orderItem.productName}
            placeholder="Name of the Item"
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="supplierName" className="mb-1 font-medium">
            Company Name
          </label>
          <input
            type="text"
            id="supplierName"
            name="supplierName"
            onChange={handleChange}
            value={orderItem.supplierName}
            placeholder="Company name"
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="orderWhen" className="mb-1 font-medium">
            When to Order
          </label>
          <input
            type="text"
            id="orderWhen"
            name="orderWhen"
            onChange={handleChange}
            value={orderItem.orderWhen}
            placeholder="When to order the item"
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="quantity" className="mb-1 font-medium">
            How many to order
          </label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            onChange={handleChange}
            value={orderItem.quantity}
            placeholder="Quantity to order"
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="relative w-full flex flex-col mb-4">
          <label
            htmlFor="storedLocation"
            className="mb-1 font-medium text-gray-700"
          >
            Choose a floor
          </label>
          <div className="relative w-full">
            <select
              onChange={handleChange}
              value={orderItem.storedLocation.toString()}
              name="storedLocation"
              id="storedLocation"
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 p-3 pr-10 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              required
            >
              <option value="" disabled hidden>
                Choose a floor
              </option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <ChevronDown size={20} />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center w-full">
          <button
            className="flex items-center gap-1 bg-green-500 font-bold text-white px-6 py-2 rounded hover:bg-green-600 cursor-pointer"
            type="submit"
          >
            Submit <SendHorizontal size={20} />
          </button>
          <Camera
            color="white"
            className="w-auto h-auto bg-green-500 text-white p-2 rounded hover:bg-green-600 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default AddItem;
