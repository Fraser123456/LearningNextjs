import Link from "next/link";
import ProductCard from "./components/ProductCard/ProductCard";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

/*
We use Link instead of <a></a> because it doesn't reload all the resources of the project
*/

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <h1>Hello {session && <span>{session.user!.name}</span>}</h1>
      <Link href="/users">users</Link>
      <ProductCard />
    </main>
  );
}
