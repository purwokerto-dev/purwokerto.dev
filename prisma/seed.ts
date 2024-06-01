import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.createMany({
    data: [
      {
        name: "testname",
        email: "test@gmail.com",
      },
      {
        name: "testname2",
        email: "test2@gmail.com",
      },
    ],
  });

  console.log({ user });
}
main()
  .then(async () => {
    console.log("Execution success");

    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
