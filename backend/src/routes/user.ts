import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  variables: {
    userId: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  //console.log("reached prisma client before");

  //console.log(c.env.DATABASE_URL);
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  //console.log("reach1");

  const body = await c.req.json();
  //console.log("body", body);

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });

  //console.log("reached after response");

  const payload = { id: user.id };

  //console.log(payload);
  //console.log(c.env.JWT_SECRET);

  const jwt = await sign(payload, c.env.JWT_SECRET);

  //console.log("reached after jwt ", jwt);

  return c.json({ jwt });
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const findUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!findUser) {
    c.status(403);
    return c.json({ error: "user not found" });
  }

  const jwt = await sign({ id: findUser.id }, c.env.JWT_SECRET);

  return c.json({ jwt });
});
