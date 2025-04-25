// components/DataTableStates.tsx
import { Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LoadingState() {
  return (
    <div className="space-y-4 w-full flex flex-col items-center justify-center text-muted-foreground">
      <Dumbbell className="size-10 animate-spin" />
      <p>Carregando...</p>
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-24">
      <p>Erro ao carregar dados</p>
      <Button size="lg" onClick={onRetry}>
        Recarregar
      </Button>
    </div>
  );
}
