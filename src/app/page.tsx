import Footer from "@/components/sections/footer";
import Hero from "@/components/sections/hero";
import NewArticles from "@/components/sections/new-articles";
import NewMembers from "@/components/sections/new-members";
import UpcomingEvents from "@/components/sections/upcoming-events";

export default async function Home() {
  return (
    <>
      <Hero />
      <UpcomingEvents />
      <NewArticles />
      <NewMembers />
      <Footer />
    </>
  );
}
