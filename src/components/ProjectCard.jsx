import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="group rounded-2xl border border-zinc-800 p-5 hover:border-zinc-600 transition"
    >
      <div className="text-sm text-zinc-400">{project.category}</div>

      <div className="mt-1 text-lg font-semibold group-hover:text-white">
        {project.title}
      </div>

      <div className="mt-2 text-zinc-300">{project.summary}</div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-zinc-800 px-2 py-1 text-xs text-zinc-300"
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}