import prisma from "@/lib/db";
import Link from "next/link";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <main>
      {users.map((user, index) => (
        <ul key={index}>
          <li>id: {user.id}</li>
          <li>nadme: {user.name}</li>
          <li>email: {user.email}</li>
        </ul>
      ))}
      <br />

      <Link href="example-login">Example Login</Link>
    </main>
  );
}
