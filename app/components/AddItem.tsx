"use client";

import { Camera } from "lucide-react";

interface AddItemProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddItem: React.FC<AddItemProps> = ({ setOpen }) => {
  return (
    <div className="w-full max-w-md mx-auto p-6 shadow-lg bg-zinc-300/10">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Add Item</h1>
        <button
          onClick={() => setOpen(false)}
          className="bg-green-500 font-bold text-white px-6 py-2 rounded hover:bg-green-600 cursor-pointer"
        >
          X
        </button>
      </div>
      <form className="flex flex-col items-center gap-3 p-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 font-medium">
            Item name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name of the Item"
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="cname" className="mb-1 font-medium">
            Company Name
          </label>
          <input
            type="text"
            id="cname"
            name="cname"
            placeholder="Company name"
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="whenOder" className="mb-1 font-medium">
            When to Order
          </label>
          <input
            type="text"
            id="whenOder"
            name="whenOder"
            placeholder="When to order the item"
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="oderValue" className="mb-1 font-medium">
            How many to order
          </label>
          <input
            type="text"
            id="oderValue"
            name="oderValue"
            placeholder="When to order the item"
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-between items-center w-full">
          <button
            className="bg-green-500 font-bold text-white px-6 py-2 rounded hover:bg-green-600 cursor-pointer"
            type="button"
          >
            Submit
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
