import {
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  QuoteIcon,
  TextIcon,
} from "lucide-react";

export const blockTypeToBlockName: Record<
  string,
  { label: string; icon: React.ReactNode }
> = {
  paragraph: {
    label: "Parágrafo",
    icon: <TextIcon className="size-4" />,
  },
  h1: {
    label: "Heading 1",
    icon: <Heading1Icon className="size-4" />,
  },
  h2: {
    label: "Heading 2",
    icon: <Heading2Icon className="size-4" />,
  },
  h3: {
    label: "Heading 3",
    icon: <Heading3Icon className="size-4" />,
  },
  number: {
    label: "Lista numeráda",
    icon: <ListOrderedIcon className="size-4" />,
  },
  bullet: {
    label: "Lista com marcadores",
    icon: <ListIcon className="size-4" />,
  },
  check: {
    label: "Lista de verificação",
    icon: <ListTodoIcon className="size-4" />,
  },
  quote: {
    label: "Quote",
    icon: <QuoteIcon className="size-4" />,
  },
};
