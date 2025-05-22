# Medium‑Clone Backend

A **Medium‑style blogging API** written in **TypeScript** using [Hono](https://hono.dev/) on **Cloudflare Workers** with **Prisma Accelerate** for edge‑friendly data access.

> Deployed URL → `https://https://backend.saikrishna-uppuluri5.workers.dev`   ← replace with your own once you run `wrangler deploy`.

---

## ✨  What’s Inside?

| Area   | Route                                    | Method | Auth? | Purpose |
|--------|------------------------------------------|--------|-------|---------|
| **Auth** | `/api/v1/user/signup`                  | POST   | ✗     | Create user & issue JWT |
|        | `/api/v1/user/signin`                    | POST   | ✗     | Login & receive JWT |
|        | `/api/v1/user/listUsers`                 | GET    | ✓*    | List all users (demo / admin) |
| **Blog** | `/api/v1/blog`                         | POST   | ✓     | Create new post |
|        | `/api/v1/blog`                           | PUT    | ✓     | Update own post |
|        | `/api/v1/blog/bulk`                      | GET    | ✓     | Fetch all posts |
|        | `/api/v1/blog/:id`                       | GET    | ✓     | Fetch single post by ID |

`✓` = requires `Authorization: Bearer <jwt>` header.  
`✓*` = keep behind admin JWT in production.

Routes follow the [RealWorld "Medium clone" spec](https://github.com/gothinkster/realworld) where practical.

---

## 🛠  Tech Stack

- **Runtime:** Cloudflare Workers (edge) 
- **Framework:** Hono 4
- **ORM / Data Proxy:** Prisma v6 + Prisma Accelerate
- **Auth:** JSON Web Tokens (HS256) with `hono/jwt`
- **Validation:** Zod
- **CI/CD:** GitHub Actions → `wrangler deploy`

---

## 🚀  Quick Start

```bash
# Clone repo & install deps
$ git clone https://github.com/sai-krishna-uppuluri/medium-clone.git
$ cd medium-clone/backend
$ pnpm install                 # or npm/yarn

# Copy env template & fill in secrets
$ cp .env.example .env         # DATABASE_URL, JWT_SECRET

# Prisma client & migrations
$ pnpx prisma generate
$ pnpx prisma migrate deploy   # for PlanetScale; skip for D1

# Local dev (Miniflare)
$ pnpm dev                     # http://localhost:8787
```

### Environment Variables

| Key            | Example                                   | Notes |
|----------------|-------------------------------------------|-------|
| `DATABASE_URL` | `file:./dev.db` <br/>  | Used by Prisma |
| `JWT_SECRET`   | `super‑secret‑key`                        | HS256 signing key |

---

## 🏗  Deployment

1. Install Wrangler → `npm i -g wrangler`
2. Login → `wrangler login`
3. Adjust `wrangler.jsonc` with your account‑id, D1 binding, etc.
4. Deploy → `pnpm deploy` (runs `wrangler deploy --minify`).

---

## 📬  Example cURL

```bash
# Sign up
curl -X POST https://<url>/api/v1/user/signup \
     -H "Content-Type: application/json" \
     -d '{"email":"alice@mail.com","password":"pass123"}'

# Create post
curl -X POST https://<url>/api/v1/blog \
     -H "Authorization: Bearer $JWT" \
     -H "Content-Type: application/json" \
     -d '{"title":"First post","content":"Hello edge!"}'
```

---

## 🖥  Front‑End Plan

The companion front‑end will be built with **React.js** + **TailwindCSS**:

1. Public feed & auth pages
2. Rich‑text / Markdown editor
3. Profile & favourites
4. Component library
5. Playwright e2e tests

---

## 📜  License

MIT © 2025 Sai Krishna Uppuluri
