import { AppType } from "@/app/api/[[...route]]/route";
import { hc } from "hono/client";

const client = hc<AppType>(process.env.NEXT_PUBLIC_API_URL as string);

export default client;
