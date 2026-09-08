import { eraLabels, featuredProjects } from "@/lib/projects";

/**
 * The three that carry the page. Server-rendered — there is no state here, and
 * the entrance is handled by the shared `.reveal` observer.
 *
 * With no product screenshots to show, the index numeral does the job an image
 * would: it gives each panel a fixed anchor, sets the reading order and keeps
 * the row feeling like a sequence rather than three separate boxes.
 */
export default function FeaturedWork() {
  return (
    <ol className="feat">
      {featuredProjects.map((p, i) => (
        <li className="feat-item reveal" key={p.slug}>
          <article className="feat-card glass">
            <span className="feat-index" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="feat-head">
              <span className="feat-tags">
                <span className="feat-era">{eraLabels[p.era]}</span>
                <span className="feat-dot" aria-hidden="true" />
                <span>{p.period}</span>
              </span>
              <h3>{p.title}</h3>
              <p className="feat-kind">{p.kind}</p>
            </div>

            <p className="feat-summary">{p.summary}</p>

            <div className={`feat-detail${p.highlights ? "" : " solo"}`}>
              <p className="feat-desc">{p.description}</p>

              {p.highlights ? (
                <ul className="feat-highlights">
                  {p.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="feat-foot">
              <div className="tags">
                {p.stack.map((s) => (
                  <span className="tag" key={s}>
                    {s}
                  </span>
                ))}
              </div>

              {p.link ? (
                <a
                  className="feat-link"
                  href={p.link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <span>Visit {p.link.label}</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M14 5h5v5M19 5l-9 9"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18 14.5V18a1.8 1.8 0 0 1-1.8 1.8H6A1.8 1.8 0 0 1 4.2 18V7.8A1.8 1.8 0 0 1 6 6h3.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </a>
              ) : (
                <span className="feat-nolink">Private client work</span>
              )}
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
