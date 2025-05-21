import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  variables: {
    userId: string;
  };
}>();

blogRouter.use("/api/v1/blog/*", async (c, next) => {
  // get the header
  const jwt = (await c.req.header("authorization")) || "";

  if (!jwt) {
    c.json({ error: "Please signin to view" });
  }

  // const token = jwt?.split(" "[1]) || "";
  const payload = await verify(jwt, c.env.JWT_SECRET);
  //split the header
  // verify the header
  // pass it on to the next

  next();
  return c.text("lll");
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const postDataContent = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: body.id,
    },
  });

  return c.json({
    id: postDataContent.id,
  });
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const postDataContent = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    id: postDataContent.id,
  });
});
