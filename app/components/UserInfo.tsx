"use client";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import AddItem from "./AddItem";
import { PackagePlus, Box } from "lucide-react";
import { ExtendedSession } from "@/interface/userInterface";
import ShowItems from "./ShowItems";

const UserInfo = () => {
  const [openAddItem, setOpenAddItem] = useState(false);
  const [openInventory, setOpenInventory] = useState(false);
  const { data: session } = useSession();
  const extendedSession = session as ExtendedSession;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchItems();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col mx-2 items-center">
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
      <section className="flex items-center gap-3 w-full justify-center">
        <div>
          <button
            onClick={() => setOpenAddItem((prevOpen) => !prevOpen)}
            className="bg-green-500 font-bold text-white px-6 py-2 mt-3 cursor-pointer flex gap-2 items-center"
          >
            Add Item <PackagePlus size={25} />
          </button>
        </div>
        <div>
          <button
            onClick={() => setOpenInventory((prev) => !prev)}
            className="bg-green-500 font-bold text-white px-4 py-2 mt-3 cursor-pointer flex gap-2 items-center"
          >
            Show Inventory <Box size={25} />
          </button>
        </div>
      </section>
      {openAddItem && (
        <section className="mt-5">
          <AddItem setOpen={setOpenAddItem} />
        </section>
      )}

      {openInventory && (
        <section className="mt-5">
          <ShowItems setOpen={setOpenInventory} items={items} />
        </section>
      )}
    </div>
  );
};

export default UserInfo;
