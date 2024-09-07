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
      <h1>users</h1>
      <p>{new Date().toLocaleTimeString()}</p>
      <ul className="pt-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="px-4 font-mono text-left text-sm w-full"
          >
            <li className="font-bold text-base">{user.name}</li>
            <li>{user.email}</li>
          </div>
        ))}
      </ul>
    </>
  );
};

export default UsersPage;
