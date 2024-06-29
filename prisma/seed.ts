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
        name: "First",
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
  
  const event = await prisma.event.create({
    data:
      {
        title: "event title",
        quota: 25,
        place: "HeteroSpace",
        dateTime: new Date(),
        description: "badge description",
        fee: 25000, 
        createdBy: admin.id,
        createdAt: new Date(),
      },
  });
  
  const socmed = await prisma.socmed.create({
    data:
      {
        name: "linkedin",
        link: "https://www.linkedin.com/in/pwtdev/",
        createdBy: admin.id,
        createdAt: new Date(),
      },
  });
  
  
  const er = await prisma.eventRegistration.create({
    data:
      {
        user: user.id,
        event: event.id,
        attend: 0,
        rsvp_link: "https://www.purwokerto.dev/",
        createdAt: new Date(),
        createdBy: admin.id
      },
  });

  const eb = await prisma.eventBadge.create({
    data:
      {
        event: event.id,
        badge: badge.id,
        speaker: user.id,
        createdAt: new Date(),
        createdBy: admin.id
      },
  });

  const ep = await prisma.eventPoint.create({
    data:
      {
        eventRegistration: er.id,
        eventBadge: eb.id,
        point: 1,
        createdAt: new Date(),
        createdBy: admin.id
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
