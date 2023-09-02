"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BiSolidUserCircle } from "react-icons/bi";
import { FaDotCircle } from "react-icons/fa";
import axios from "@/api/axios";
const page = () => {
  const { push } = useRouter();
  const [dataUser, setDataUser] = useState({
    status: "inactive",
    nama: "",
    email: "",
    role: "user",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setDataUser({
      ...dataUser,
      [name]: value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post("/users", dataUser);
      alert(response.data.message);
      push("/");
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <section className="w-full flex flex-col justify-center items-center gap-10 h-[90vh] px-10">
      <h1 className="flex flex-col items-center gap-3 text-4xl font-semibold">
        <BiSolidUserCircle size="3em" />
        <span className="flex flex-row items-center gap-1">
          <FaDotCircle size=".5em" color={dataUser.status === "active" ? "green" : "red"} />
          {!dataUser.nama ? "New User" : dataUser.nama}
        </span>
      </h1>
      <form onSubmit={handleSubmit} className="xl:w-1/3 md:w-1/2 w-full">
        <div className="mb-6">
          <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue="inactive"
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="inactive" disabled>
              Pilih Status
            </option>
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nama
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            onChange={handleChange}
            placeholder="e.g: John Doe"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            placeholder="e.g: @johndoe123@gmail.com"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Role
          </label>
          <select
            id="role"
            name="role"
            onChange={handleChange}
            defaultValue="user"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="super_admin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="user" disabled>
              Pilih Role
            </option>
          </select>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default page;
