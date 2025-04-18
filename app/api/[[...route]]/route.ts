import { Hono } from "hono";
import { handle } from "hono/vercel";

import personal from "./personal";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const route = app.route("/personal", personal);

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);

export type AppType = typeof route;
