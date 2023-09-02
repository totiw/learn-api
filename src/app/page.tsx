"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { User } from "../../typings";
import { BsTrash } from "react-icons/bs";
import { BiEdit, BiSolidUserPlus } from "react-icons/bi";
import { Spinner } from "@/components/spinner";
import axios from "../api/axios";

const Home = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get("/users");
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (idUser?: number, namaUser?: string) => {
    const isConfirm = window.confirm(`Yakin ingin menghapus user: ${namaUser}`);

    if (!isConfirm) return;

    try {
      const response = await axios.delete(`/users/${idUser}`);
      alert(response.data.message);
      getUsers();
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      {!users.length ? (
        <Spinner />
      ) : (
        <main className="max-h-screen flex flex-col gap-5 py-10 px-10">
          <h1 className="text-4xl font-bold">Table User</h1>
          <Link
            href="/users/add"
            className="bg-green-400 flex flex-row items-center self-start gap-2 font-bold text-white p-3 px-5 rounded-md"
          >
            <p>Add new user</p>
            <BiSolidUserPlus />
          </Link>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nama
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: User, index: number) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 text-base">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{user.status}</td>
                    <td className="px-6 py-4">{user.nama}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4 flex flexrow gap-2">
                      <button
                        onClick={() => deleteUser(user.id, user.nama)}
                        type="button"
                        className="p-3 bg-red-500 text-white rounded-md"
                      >
                        <BsTrash size="1em" />
                      </button>
                      <Link
                        href={`/users/update/${user.id}`}
                        type="button"
                        className="p-3 bg-blue-500 text-white rounded-md"
                      >
                        <BiEdit size="1em" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}
    </>
  );
};

export default Home;
