import React from "react";

//Helpers
import { sort, inPlaceSort } from "fast-sort";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  sortOrder: string;
}

const UserTable = async ({ sortOrder }: Props) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();
  let sorted: User[] = users;

  if (!sortOrder) sorted = sort(users).asc((x) => x.name);
  if (sortOrder === "name") sorted = sort(users).asc((x) => x.name);
  if (sortOrder === "email") sorted = sort(users).asc((x) => x.email);

  return (
    <table className="table mt-5">
      <thead>
        <tr className="bg-base-200">
          <th className="font-bold text-base">
            <Link href="/users?sortOrder=name">Username</Link>
          </th>
          <th className="font-bold text-base">
            <Link href="/users?sortOrder=email">Email</Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {sorted.length > 0
          ? sorted.map((user) => (
              <tr
                key={user.id}
                className="px-4 font-mono text-left text-sm w-full"
              >
                <td className="font-bold text-base">{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};

export default UserTable;
