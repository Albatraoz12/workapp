"use client";
import React from "react";
import { signOut } from "next-auth/react";

const UserInfo = () => {
  return (
    <div className="grid place-items-center h-sscreen">
      <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
        <div>
          Name: <span className="font-bold">Dimosthenis</span>
        </div>
        <div>
          Email: <span className="font-bold">d123@gmail.com</span>
        </div>
        <div>
          Work Place: <span className="font-bold">Karolinska</span>
        </div>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white font-bold px-6 py-2 mt-3 cursor-pointer"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
