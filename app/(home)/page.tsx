import { Footer } from "./_components/footer";
import { Hero } from "./_components/hero";
import { Navbar } from "./_components/navbar";

export default function Home() {
  return (
    <main className="bg-black w-full min-h-svh text-white space-y-20 lg:space-y-36">
      <Navbar />
      <Hero />
      <Footer />
    </main>
  );
}
