import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signinInput, signupInput } from "saikrishna-zod-validations-medium";

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
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signupInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ error: "Incorrect Inputs" });
  }

  try {
    //need to be completed to check whether the already signedup user trying to signup again
    const find_user_existed = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (find_user_existed) {
      c.status(409);
      return c.json({ message: "Email already existed" });
    }
  } catch (e) {
    return c.json({ e: "error while checking" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });

    const payload = { id: user.id };
    const jwt = await sign(payload, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (error) {
    return c.json({ error: "Something went wrong, Try again later" });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signinInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Incorrect inputs",
    });
  }

  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!findUser) {
      c.status(403);
      return c.json({ error: "user not found" });
    }

    const jwt = await sign({ id: findUser.id }, c.env.JWT_SECRET);

    return c.json({ jwt });
  } catch (error) {
    c.json({
      error: "Something Went Wrong. Try again later (SignIn)",
    });
  }
});

userRouter.get("/listUsers", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const listOfUsersData = await prisma.user.findMany();

  return c.json({ listOfUsersData });
});
