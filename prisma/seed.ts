import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = "testpwd";
  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const admin = await prisma.admin.create({
    data:
      {
        username: "testname",
        password: hashedPassword,
        name: "testname",
      },
  });
  const user = await prisma.user.create({
    data: {
        username: "testname",
        password: hashedPassword,
        firstName: "First",
        email: "test@gmail.com",
        createdAt: new Date(),
        createdBy: admin.id,
    },
  });

  console.log({ admin, user });
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
