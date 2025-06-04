import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import {
  createBlogPost,
  updateBlogPost,
} from "saikrishna-zod-validations-medium";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const jwt = (await c.req.header("authorization")) || "";
  const token = jwt.split(" ")[1] || "";

  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    if (payload) {
      c.set("userId", payload.id);
      await next();
    }
  } catch (error) {
    return c.json({ error: " unauthorized" });
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const { success } = createBlogPost.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Incorrect inputs",
    });
  }

  try {
    const postDataContent = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });

    return c.json({
      id: postDataContent.id,
    });
  } catch (error) {
    return c.json({ error: "Could not able to create post at this moment" });
  }
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const { success } = updateBlogPost.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Incorrect inputs",
    });
  }

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

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const getAllPosts = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({ getAllPosts });
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogId = c.req.param("id");
  try {
    const getPostById = await prisma.post.findFirst({
      where: {
        id: blogId,
      },
    });

    return c.json({ getPostById });
  } catch (error) {
    c.json({ error: "Could Not find the post" });
  }
});
