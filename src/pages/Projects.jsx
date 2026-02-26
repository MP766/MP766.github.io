import projects from "../data/projects.json";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="mt-2 text-zinc-300">
          A selection of tools, games, and prototypes. Click a project for the technical breakdown.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}