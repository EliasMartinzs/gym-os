interface Props {
  children: React.ReactNode;
}

export const Icon = ({ children }: Props) => {
  return (
    <div className="size-16 bg-card/50 rounded-full grid place-items-center transition-colors hover:bg-background/50 cursor-pointer">
      {children}
    </div>
  );
};
