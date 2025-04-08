export default function LayoutAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-[#1F1F24] w-full min-h-svh flex items-center justify-center">
      {children}
    </main>
  );
}
