"use client";

import React, { useState, useEffect } from "react";
import SideBar from "@/components/SideBar";
import NavCategory from "@/components/NavCategory";
import ListFolder from "@/components/ListFolder";
import axios from "axios";

const Page = ({ params: { id } }) => {
  let jwt
  const [folsubTugas, setFolsubTugas] = useState("");
  const [folTugas, setFolTugas] = useState("");

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const token = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/token`,
      {
        withCredentials: true,
      }
    );
    jwt = token.data.accessToken;

    const folderTugas = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/accreditationType/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFolTugas(folderTugas);

    const folderSubTugas = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/accreditationSubtypes`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFolsubTugas(folderSubTugas);
  };

  return (
    <div className="flex flex-row gap-2">
      <div className="text-gray-700 h-screen w-[249px]">
        <SideBar activePage="tugas" />
      </div>
      <div className="w-full bg-gray-50">
        <div className="ml-[32px] mr-[32px] my-4 flex flex-col gap-3">
          <section>
            <div>
              <NavCategory judul={folTugas.data} />
            </div>
          </section>
          <div className="pt-2">
            <ListFolder data={folsubTugas.data} id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;