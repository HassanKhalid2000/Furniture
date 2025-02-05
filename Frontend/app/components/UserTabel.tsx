/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
const BASE_URL = "http://localhost:3001/user";
export interface IUser extends Document {
  _id: string;
  fullName: string;
  phoneNumber: number;
  address: string;
  email: string;
  password: string;
  avatar: string;
}
const UserTabel = () => {
  const [data, setData] = useState<IUser[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${BASE_URL}`);
      const user: IUser[] = await res.json();
      setData(user);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className=" p-5 grid  ">
        <table className="table ">
          {/* head */}
          <thead className="text-2xl text-left">
            <tr className="space-y-5">
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th className="text-center">Procedure</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user._id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12 ">
                        <img
                          className="rounded-full"
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.fullName}</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-ghost badge-sm">
                    {user.email}
                  </span>
                </td>
                <td>{user.phoneNumber}</td>
                <td>{user.address}</td>
                <th>
                  <button className="btn secbtn btn-xs">append</button>
                  <button className="btn prbtn btn-xs">suspend</button>
                  <button className="btn prbtn bg-red-500 hover:bg-red-700 btn-xs">
                    delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserTabel;
