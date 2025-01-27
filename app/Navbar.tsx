"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

function Navbar() {
  const { status, data: session } = useSession();

  return (
    <div className="navbar bg-slate-200">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          Fraser UI
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/users">Users</Link>
          </li>
          <li>
            <Link href="/products">Products</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link href="/admin" className="btn m-2">
          Admin
        </Link>
        {status === "authenticated" ? (
          <>
            <div>
              <h1 className="text-sm text-balance">{session.user?.name}</h1>
            </div>
            <Link href="api/auth/signout" className="btn m-1">
              Sign Out
            </Link>
          </>
        ) : (
          <Link href="/api/auth/signin" className="btn m-2">
            Signin
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
