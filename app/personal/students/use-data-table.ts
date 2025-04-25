import client from "@/lib/client";
import { InferResponseType } from "hono";
import { useMemo } from "react";

type Response = InferResponseType<
  (typeof client.api.personal.students)[":param"]["$get"]
>["data"];

export function useTableData(data: Response) {
  return useMemo(() => {
    if (!data) return [];
    return data.map(({ user }) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      phone: user.phone,
    }));
  }, [data]);
}
