import React from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const UsersPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();
  return (
    <>
      <h1>Users</h1>
      <table className="table mt-5">
        <thead>
          <tr className="bg-base-200">
            <th className="font-bold text-base">Username</th>
            <th className="font-bold text-base">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="px-4 font-mono text-left text-sm w-full"
            >
              <td className="font-bold text-base">{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersPage;
