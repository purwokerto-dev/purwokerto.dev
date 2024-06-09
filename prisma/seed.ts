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
  const blogTag = await prisma.blogTag.create({
    data: {
      title: "programming language",
    },
  });

  const blog = await prisma.blog.create({
    data:
      {
        title: "blog title",
        body: "blog body",
        createdBy: user.id,
        createdAt: new Date(),
      },
  });

  const tagsOnBlogs = await prisma.tagsOnBlogs.create({
    data: {
      blogId: blog.id,
      tagId: blogTag.id,
    }
  });

  const badge = await prisma.badge.create({
    data:
      {
        title: "badge title",
        description: "badge description",
        img: "badge_one.png",
        createdBy: admin.id,
        createdAt: new Date(),
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
