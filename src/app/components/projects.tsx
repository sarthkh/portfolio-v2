import { Reveal } from "../utils/reveal";
import ProjectCard from "./project-card";

export default function Projects() {
  return (
    <div className="text-sm">
      <Reveal>
        <span className="font-migra text-xl tracking-widest">Projects</span>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-3 mt-8 gap-x-12 gap-y-8">
        <ProjectCard
          url="https://github.com/sarthakz25/inscribe"
          title="Inscribe"
          description="A real-time collaborative note-taking web app with rich text editing and nested document structure."
        />
        <ProjectCard
          url="https://github.com/sarthakz25/bookmark"
          title="Bookmark"
          description="An AR indoor navigation app for college library, improving user navigation experience."
        />
        <ProjectCard
          url="https://github.com/knlrvr/ttrpcompanion"
          title="Converse"
          description="A cross-platform social media app with real-time content sharing and voting system."
        />
      </div>
    </div>
  );
}
