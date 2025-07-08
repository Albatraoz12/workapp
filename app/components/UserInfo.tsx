"use client";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import AddItem from "./AddItem";
import { PackagePlus, Box } from "lucide-react";
import { ExtendedSession } from "@/interface/userInterface";
import ShowItems from "./ShowItems";
import { deleteItem } from "@/lib/helper";
import DeleteModal from "./modal/DeleteModal";

const UserInfo = () => {
  const [openAddItem, setOpenAddItem] = useState(false);
  const [openInventory, setOpenInventory] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const extendedSession = session as ExtendedSession;

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/items/getAllItems");
      const data = await res.json();
      setItems(data.message);
    } catch (error) {
      console.error("Failed to fetch items", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteItem(id);
      setItems((prevItems) => prevItems.filter((item: any) => item._id !== id));
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center mx-auto">
      {showDeleteModal && (
        <DeleteModal
          isOpen={showDeleteModal}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={async () => {
            if (selectedItemId) {
              await handleDeleteItem(selectedItemId);
              setShowDeleteModal(false);
              setSelectedItemId(null);
            }
          }}
        />
      )}
      <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
        <div>
          Name: <span className="font-bold">{extendedSession?.user?.name}</span>
        </div>
        <div>
          Email:{" "}
          <span className="font-bold">{extendedSession?.user?.email}</span>
        </div>
        <div>
          Work Place:{" "}
          <span className="font-bold">{extendedSession?.user?.workPlace}</span>
        </div>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white font-bold px-6 py-2 mt-3 cursor-pointer"
        >
          Log Out
        </button>
      </div>
      <section className="flex items-center flex-wrap gap-3 w-full justify-center">
        <div>
          <button
            onClick={() => {
              setOpenAddItem((prevOpen) => !prevOpen);
              setOpenInventory(false);
            }}
            className="bg-green-500 font-bold text-white px-6 py-2 mt-3 cursor-pointer flex gap-2 items-center"
          >
            Add Item <PackagePlus size={25} />
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              setOpenInventory((prev) => !prev);
              setOpenAddItem(false);
            }}
            className="bg-green-500 font-bold text-white px-4 py-2 mt-3 cursor-pointer flex gap-2 items-center"
          >
            Show Inventory <Box size={25} />
          </button>
        </div>
      </section>
      {openAddItem && (
        <section className="mt-5 max-w-full">
          <AddItem setOpen={setOpenAddItem} refreshItems={fetchItems} />
        </section>
      )}

      {openInventory && (
        <section className="mt-5 max-w-full">
          <ShowItems
            setOpen={setOpenInventory}
            items={items}
            setSelectedItemId={setSelectedItemId}
            setShowDeleteModal={setShowDeleteModal}
          />
        </section>
      )}
    </div>
  );
};

export default UserInfo;
