import { Link } from "react-router-dom";
import projects from "../data/projects.json";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const featured = projects.slice(0, 2);

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Mark Perez</h1>
        <p className="max-w-2xl text-zinc-300">
          I build tools and games with Unity/C#, C++/SFML, and web tech. This site
          showcases my strongest projects and the technical work behind them.
        </p>

        <div className="flex gap-3">
          <Link
            to="/projects"
            className="rounded-xl bg-white px-4 py-2 text-zinc-950 font-medium hover:opacity-90"
          >
            View Projects
          </Link>
          <a
            href="mailto:you@email.com"
            className="rounded-xl border border-zinc-700 px-4 py-2 text-zinc-100 hover:border-zinc-500"
          >
            Contact
          </a>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">Featured</h2>
          <Link to="/projects" className="text-sm text-zinc-300 hover:text-white">
            View all →
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}