import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import Missions from "@/components/Missions";
import Infra from "@/components/Infra";
import Workbench from "@/components/Workbench";
import Log from "@/components/Log";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <Missions />
        <Infra />
        <Workbench />
        <Log />
        <Contact />
      </main>
      <footer className="footer">
        <div className="wrap">
          © {new Date().getFullYear()} Maxence Leguéry. A static Next.js export, served by nginx from a VPS I run.
        </div>
      </footer>
    </>
  );
}
