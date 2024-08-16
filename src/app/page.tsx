import About from "./components/about";
import BlogPreview from "./components/blog";
import Footer from "./components/footer";
import Projects from "./components/projects";

export default function Home() {
  return (
    <main className="space-y-12">
      <About />
      <Projects />
      <BlogPreview />
      <Footer />
    </main>
  );
}
