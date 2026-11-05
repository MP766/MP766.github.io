import { useParams, Link } from "react-router-dom";
import projects from "../data/projects.json";

function MediaGallery({ media = [], title }) {
  const supportedMedia = Array.isArray(media)
    ? media.filter(
        (item) =>
          item &&
          ((item.type === "youtube" && item.youtubeId) ||
            (item.type === "image" && item.src)),
      )
    : [];

  if (!supportedMedia.length) return null;

  return (
    <div className="space-y-4">
      {title ? <h2 className="font-semibold">{title}</h2> : null}

      <div className="grid gap-4 md:grid-cols-2">
        {supportedMedia.map((m, idx) => {
          if (m.type === "youtube") {
            return (
              <figure key={`${m.youtubeId}-${idx}`} className="overflow-hidden rounded-2xl border border-zinc-800">
                <div className="aspect-video">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${m.youtubeId}`}
                    title={m.caption || "Project video"}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                {m.caption ? (
                  <figcaption className="p-3 text-sm text-zinc-300">{m.caption}</figcaption>
                ) : null}
              </figure>
            );
          }

          return (
            <figure key={`${m.src}-${idx}`} className="overflow-hidden rounded-2xl border border-zinc-800">
              <img src={m.src} alt={m.alt || ""} className="h-auto w-full" loading="lazy" />
              {m.caption ? (
                <figcaption className="p-3 text-sm text-zinc-300">{m.caption}</figcaption>
              ) : null}
            </figure>
          );
        })}
      </div>
    </div>
  );
}

//Section Code
function ProjectSections({ sections = [] }) {
  const populatedSections = Array.isArray(sections)
    ? sections.filter(
        (section) =>
          section &&
          (section.title || section.body?.length || section.bullets?.length || section.media?.length),
      )
    : [];

  if (!populatedSections.length) return null;

  return (
    <section className="space-y-4">
      <h2 className="font-semibold">Breakdown</h2>

      <div className="space-y-4">
        {populatedSections.map((s, idx) => (
          <div key={idx} className="rounded-2xl border border-zinc-800 p-5 space-y-3">
            {s.title ? <h3 className="text-lg font-semibold">{s.title}</h3> : null}

            {Array.isArray(s.body) && s.body.length ? (
              <div className="space-y-2 text-zinc-300">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ) : null}

            {Array.isArray(s.bullets) && s.bullets.length ? (
              <ul className="list-disc pl-5 text-zinc-300 space-y-1">
                {s.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            ) : null}

            <MediaGallery media={s.media} />
          </div>
        ))}
      </div>
    </section>
  );
}

//Project Structure Code
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

      {Array.isArray(p.tech) && p.tech.length ? (
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
      ) : null}

      {Array.isArray(p.highlights) && p.highlights.length ? (
        <section className="rounded-2xl border border-zinc-800 p-5">
          <h2 className="font-semibold">Highlights</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-300">
            {p.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <ProjectSections sections={p.sections} />

      <MediaGallery media={p.media} title="Media" />

      {p.links?.github || p.links?.demo || p.links?.video ? (
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
      ) : null}
    </div>
  );
}
