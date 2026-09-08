"use client";

import { useState } from "react";

import { eraLabels, featuredProjects } from "@/lib/projects";

/**
 * The three that carry the page.
 *
 * What stays on screen is what a visitor can scan in five seconds: the name,
 * what it is, one line, the three things it does, the stack. The full write-up
 * is one click away rather than three paragraphs deep on arrival.
 *
 * With no product screenshots to show, the index numeral does the job an image
 * would: it anchors each panel, sets the reading order, and makes the row read
 * as a sequence rather than three separate boxes.
 */
export default function FeaturedWork() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <ol className="feat">
      {featuredProjects.map((p, i) => {
        const isOpen = open === p.slug;
        return (
          <li className="feat-item reveal" key={p.slug}>
            <article className={`feat-card glass${isOpen ? " open" : ""}`}>
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

              <div className="feat-body">
                {p.highlights ? (
                  <ul className="feat-highlights">
                    {p.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                ) : null}

                <button
                  type="button"
                  className="feat-more"
                  aria-expanded={isOpen}
                  aria-controls={`feat-detail-${p.slug}`}
                  onClick={() => setOpen(isOpen ? null : p.slug)}
                >
                  <span>{isOpen ? "Close it again" : "How it was built"}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M12 5v14"
                      className="plus-bar"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path d="M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>

                <div className="feat-detail" id={`feat-detail-${p.slug}`} aria-hidden={!isOpen}>
                  <div className="feat-detail-inner">
                    <p>{p.description}</p>
                  </div>
                </div>
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
                    <span>Open {p.link.label}</span>
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
                  <span className="feat-nolink">Client work — no public link</span>
                )}
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
