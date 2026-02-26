import { useParams, Link } from "react-router-dom";
import projects from "../data/projects.json";

export default function ProjectDetail() {
  const { id } = useParams();
  const p = projects.find((x) => x.id === id);

  if (!p) {
    return (
      <div className="space-y-4">
        <Link to="/projects" className="text-sm text-zinc-400 hover:text-zinc-200">
          ← Back to Projects
        </Link>
        <h1 className="text-2xl font-bold">Project not found</h1>
        <p className="text-zinc-300">
          No project with id: <span className="font-mono text-zinc-200">{id}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/projects" className="text-sm text-zinc-400 hover:text-zinc-200">
        ← Back to Projects
      </Link>

      <div className="space-y-2">
        <div className="text-sm text-zinc-400">{p.category}</div>
        <h1 className="text-3xl font-bold">{p.title}</h1>
        <p className="text-zinc-300">{p.summary}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {p.tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-zinc-800 px-2 py-1 text-xs text-zinc-300"
          >
            {t}
          </span>
        ))}
      </div>

      <section className="rounded-2xl border border-zinc-800 p-5">
        <h2 className="font-semibold">Highlights</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-300">
          {p.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </section>

      <section className="flex flex-wrap gap-3">
        {p.links.github ? (
          <a className="rounded-xl border border-zinc-700 px-4 py-2 hover:border-zinc-500" href={p.links.github}>
            GitHub
          </a>
        ) : null}
        {p.links.demo ? (
          <a className="rounded-xl border border-zinc-700 px-4 py-2 hover:border-zinc-500" href={p.links.demo}>
            Live Demo
          </a>
        ) : null}
        {p.links.video ? (
          <a className="rounded-xl border border-zinc-700 px-4 py-2 hover:border-zinc-500" href={p.links.video}>
            Video
          </a>
        ) : null}
      </section>
    </div>
  );
}