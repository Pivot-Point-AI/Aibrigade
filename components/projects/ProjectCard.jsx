"use client";

import {
  LANGUAGES,
  defaultLanguage,
  formatDuration,
  languageCodes,
  projectOrientation,
} from "@/components/projects.data";
import { getUseCase } from "@/components/usecases.data";
import ProjectMedia from "@/components/projects/ProjectMedia";
import ProjectResources from "@/components/projects/ProjectResources";
import { usePopup } from "@/components/PopupContext";

/**
 * One project, as the home page shows it: a brief, not the whole file.
 * Its name and what it is, the demo in ONE language (English where it
 * exists), the chain it runs in a line, and the way to its own page.
 *
 * The other language cuts are not switched between here. A project that
 * has them says so twice — a "3 languages" badge beside its type, and a
 * line by the button naming them — and both send the visitor to
 * `/use-cases/<id>` (UseCase.jsx), where every cut plays. The overview
 * PDF, the features and the full flow live there too.
 *
 * `variant="featured"` lays the stage beside the copy at full width;
 * `variant="card"` stacks them for the grid. Both are this one component:
 * the same project data renders in either slot.
 *
 * A project with no video at all (documents only) gets a document
 * presentation instead of an empty player — see `DocumentOnly` below.
 */
export default function ProjectCard({ project, index, variant = "card" }) {
  const { startTransition } = usePopup();
  const codes = languageCodes(project);
  const code = defaultLanguage(project);
  const video = code ? project.videos[code] : null;
  const layout = projectOrientation(project);
  const n = String(index + 1).padStart(2, "0");
  const titleId = `project-${project.id}-title`;
  const href = `/use-cases/${project.id}`;
  const flow = getUseCase(project.id)?.flow || [];

  const nameOf = (c) => LANGUAGES[c]?.english || c;
  const all = listOf(codes.map(nameOf));
  const others = listOf(codes.filter((c) => c !== code).map(nameOf));
  const multilingual = codes.length > 1;

  const meta = [];
  if (code) meta.push(nameOf(code));
  if (video?.duration) meta.push(formatDuration(video.duration));

  const open = (e) => {
    e.preventDefault();
    startTransition(href);
  };

  return (
    <article
      id={`project-${project.id}`}
      className={`ax-proj__card ax-proj__card--${variant}`}
      data-layout={layout}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <header className="ax-proj__head">
        <p className="ax-proj__eyebrow">
          <span className="ax-proj__n" aria-hidden="true">
            {n}
          </span>
          {variant === "featured" && <span className="ax-proj__flag">Featured project</span>}
          <span className="ax-proj__type">{project.type}</span>
          {multilingual && (
            <a
              href={href}
              className="ax-proj__lang-badge"
              title={`Available in ${all} — view details to watch`}
              aria-label={`Available in ${all}. View details to watch every language.`}
              onClick={open}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path
                  d="M3.5 12h17M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5s1.1-6.1 3.4-8.5z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
              {codes.length} languages
            </a>
          )}
        </p>
        <h3 className="ax-proj__name" id={titleId}>
          {project.name}
        </h3>
        {project.tagline && <p className="ax-proj__tagline">{project.tagline}</p>}
        {project.description && (
          <p className={`ax-proj__desc${variant === "card" ? " ax-proj__desc--card" : ""}`}>
            {project.description}
          </p>
        )}
      </header>

      <div className="ax-proj__media">
        {video ? (
          <ProjectMedia video={video} code={code} projectName={project.name} variant={variant} />
        ) : (
          <DocumentOnly project={project} />
        )}
      </div>

      <footer className="ax-proj__foot">
        {flow.length > 0 && (
          <div className="ax-proj__flow">
            <p className="ax-proj__flow-label" id={`${titleId}-flow`}>
              How it works
            </p>
            <ol className="ax-proj__flow-list" aria-labelledby={`${titleId}-flow`}>
              {flow.map((step) => (
                <li key={step.name}>
                  <span>{step.name}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="ax-proj__cta">
          <div className="ax-proj__cta-info">
            {meta.length > 0 && <p className="ax-proj__meta">{meta.join(" · ")}</p>}
            {multilingual && (
              <p className="ax-proj__cta-hint">Also in {others} — view details to watch.</p>
            )}
          </div>
          {/* Every product has its own page — every language cut, the full
              flow, what it brings. */}
          <a
            href={href}
            className="ax-proj__more"
            aria-label={`View details: ${project.name}`}
            onClick={open}
          >
            View details
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M5 12h13M13 6l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </footer>
    </article>
  );
}

/** "English", "English and Arabic", "English, Arabic and Urdu". */
function listOf(names) {
  if (names.length < 2) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

/** A project that exists only as a document. No fake player — the
 *  document itself is the artefact, and it says so. */
function DocumentOnly({ project }) {
  return (
    <div className="ax-proj__doc">
      <svg viewBox="0 0 48 48" aria-hidden="true" className="ax-proj__doc-icon">
        <path d="M13 6h15l9 9v27H13z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M28 6v9h9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M19 24h12M19 30h12M19 36h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <p className="ax-proj__doc-line">Documentation only — no demo video for this project yet.</p>
      <ProjectResources resources={project.resources} projectName={project.name} heading={false} />
    </div>
  );
}
