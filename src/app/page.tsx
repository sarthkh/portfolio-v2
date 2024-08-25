import About from "./components/about";
import BlogPreview from "./components/blog";
import Contact from "./components/contact";
import Projects from "./components/projects";
import SpotifyNowPlaying from "./components/spotify-now-playing";

export default function Home() {
  return (
    <main className="space-y-14">
      <About />
      <Projects />
      <BlogPreview />
      <Contact />
      <SpotifyNowPlaying />
    </main>
  );
}
