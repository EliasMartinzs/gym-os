interface Props {
  children: React.ReactNode;
}

export const Icon = ({ children }: Props) => {
  return (
    <div className="size-16 bg-primary text-primary-foreground rounded-full grid place-items-center transition-colors hover:bg-primary/80 cursor-pointer">
      {children}
    </div>
  );
};
