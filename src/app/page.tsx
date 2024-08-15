import About from "./components/about";
import Projects from "./components/projects";

export default function Home() {
  return (
    <main className="space-y-12">
      <About />
      <Projects />
    </main>
  );
}
