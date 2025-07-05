"use client";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import AddItem from "./AddItem";
import { PackagePlus, Box } from "lucide-react";

interface ExtendedUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  workPlace?: string;
}

interface ExtendedSession {
  user?: ExtendedUser;
}

const UserInfo = () => {
  const [open, setOpen] = useState(false);
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
            onClick={() => setOpen((prevOpen) => !prevOpen)}
            className="bg-green-500 font-bold text-white px-6 py-2 mt-3 cursor-pointer flex gap-2 items-center"
          >
            Add Item <PackagePlus size={25} />
          </button>
        </div>
        <div>
          <button className="bg-green-500 font-bold text-white px-4 py-2 mt-3 cursor-pointer flex gap-2 items-center">
            Show Inventory <Box size={25} />
          </button>
        </div>
      </section>
      {open && (
        <section className="mt-5">
          <AddItem setOpen={setOpen} />
        </section>
      )}
    </div>
  );
};

export default UserInfo;
