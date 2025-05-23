import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { RotateCcw } from "lucide-react";
import React from "react";

interface Props extends React.ComponentProps<"div"> {
  isRefetching: boolean;
}

export const State = ({ children, isRefetching, ...props }: Props) => {
  return (
    <Card
      className="min-h-64 xl:min-w-96 flex items-center justify-center"
      {...props}
    >
      <CardHeader className="w-full text-center">
        <CardTitle>{children}</CardTitle>
      </CardHeader>
      <CardContent>
        <RotateCcw
          className={cn("cursor-pointer", isRefetching && "animate-spin")}
        />
      </CardContent>
    </Card>
  );
};
