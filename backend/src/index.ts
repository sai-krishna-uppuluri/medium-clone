import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.post("/signup", async (c) => {
  console.log("reached prisma client before");

  console.log(c.env.DATABASE_URL);
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  console.log("reach1");

  const body = await c.req.json();
  console.log("body", body);

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });

  console.log("reached after response");

  const payload = { id: user.id };

  console.log(payload);
  console.log(c.env.JWT_SECRET);

  const jwt = await sign(payload, c.env.JWT_SECRET);

  console.log("reached after jwt ", jwt);

  return c.json({ jwt });
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
