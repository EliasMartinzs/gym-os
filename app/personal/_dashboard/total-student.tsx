import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mars, Venus } from "lucide-react";

export const TotalStudent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total de alunos</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-x-4">
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <div className="w-full h-60 rounded-3xl shadow bg-background/30 grid place-items-center font-black">
            75
          </div>
          <Venus className="size-10" />
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <div className="w-full h-60 rounded-3xl shadow bg-background/30 grid place-items-center font-black">
            34
          </div>

          <Mars className="size-10" />
        </div>
      </CardContent>
    </Card>
  );
};
