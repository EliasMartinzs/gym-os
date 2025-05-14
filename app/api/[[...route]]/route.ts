import { Hono } from "hono";
import { handle } from "hono/vercel";

import personal from "./personal";

import type { PageConfig } from "next";

export const config: PageConfig = {
  runtime: "edge",
};

const app = new Hono().basePath(process.env.NEXT_PUBLIC_API_URL ? "" : "/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _route = app.route("/personal", personal);

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);

export type AppType = typeof _route;
