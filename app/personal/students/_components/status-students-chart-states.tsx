import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const State = ({ state }: { state: React.ReactNode }) => {
  return (
    <Card className="xl:min-w-96 flex items-center justify-center">
      <CardHeader className="w-full text-center">
        <CardTitle>Estudantes por status</CardTitle>
      </CardHeader>
      <CardContent>{state}</CardContent>
    </Card>
  );
};
