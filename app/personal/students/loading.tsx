import { Loader2 } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="absolute top-0 left-0 z-50 w-full h-svh grid place-items-center">
      <Loader2 className="size-8 animate-spin" />
    </div>
  );
}
