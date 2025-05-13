import {
  Tooltip as TooltipMain,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  trigger: React.ReactNode;
  text: React.ReactNode;
};

export const Tooltip = ({ text, trigger }: Props) => {
  return (
    <TooltipProvider delayDuration={0}>
      <TooltipMain>
        <TooltipTrigger>{trigger}</TooltipTrigger>
        <TooltipContent className="p-6">{text}</TooltipContent>
      </TooltipMain>
    </TooltipProvider>
  );
};
