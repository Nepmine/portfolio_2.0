"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { trips, type Shot, type Trip } from "@/lib/activities";

/* ------------------------------------------------------------------ *
 * Placeholder
 * ------------------------------------------------------------------ */

/**
 * Stands in until a real photo arrives. It is deterministic on the seed, so
 * each place keeps its own horizon and its own light, and the section reads as
 * designed rather than as a set of empty boxes.
 */
function Placeholder({ seed, label }: { seed: string; label?: string }) {
  // Cheap string hash — stable across server and client, which matters because
  // this renders during SSR too.
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  const n = Math.abs(h);

  const horizon = 44 + (n % 26);            // where the near ridge tops out, %
  const sunX = 16 + ((n >> 3) % 68);        // light position across the frame
  const sunY = horizon - 12 - ((n >> 7) % 16);
  const mood = (n >> 6) % 3;                // which ground
  // Only some frames get a visible light source. A sun in every single frame
  // is what made the set read as wallpaper rather than as photographs.
  const hasSun = ((n >> 11) % 3) !== 0;
  const tilt = ((n >> 13) % 7) - 3;         // a few degrees of horizon roll

  const grounds = [
    "linear-gradient(178deg, #16332a 0%, #0e241d 46%, #081713 100%)",
    "linear-gradient(184deg, #123028 0%, #0b1f19 52%, #061210 100%)",
    "linear-gradient(176deg, #1b332a 0%, #102620 44%, #0a1a15 100%)",
  ];

  return (
    <span className="ph" style={{ background: grounds[mood] }} aria-hidden="true">
      {hasSun ? (
        <span className="ph-sun" style={{ left: `${sunX}%`, top: `${sunY}%` }} />
      ) : null}
      <span
        className="ph-ridge"
        style={{ height: `${100 - horizon}%`, rotate: `${tilt * 0.4}deg` }}
      />
      <span
        className="ph-ridge two"
        style={{ height: `${Math.max(18, 100 - horizon - 12)}%`, rotate: `${-tilt * 0.5}deg` }}
      />
      <span className="ph-grain" />
      {label ? <span className="ph-label">{label}</span> : null}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Gallery overlay
 * ------------------------------------------------------------------ */

/**
 * Splits the shots into rows and drops one line between each, so the poetry
 * lands in the gaps rather than being stacked underneath the photographs.
 */
function interleave(gallery: Shot[], lines: string[]) {
  if (!lines.length) return [{ shots: gallery, line: undefined }];
  const per = Math.ceil(gallery.length / lines.length);
  return lines.map((line, i) => ({
    shots: gallery.slice(i * per, (i + 1) * per),
    // The last line has nothing after it to separate, so it closes the set.
    line,
  }));
}

function Gallery({ trip, onClose }: { trip: Trip; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    // Hold the page still behind the overlay, and compensate for the vanishing
    // scrollbar so the layout underneath does not jump sideways.
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const { overflow, paddingRight } = document.body.style;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;

    panelRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [onClose]);

  const rows = interleave(trip.gallery, trip.lines);

  return createPortal(
    <div className="gal" role="dialog" aria-modal="true" aria-label={`${trip.place} photographs`}>
      <button className="gal-scrim" onClick={onClose} aria-label="Close gallery" tabIndex={-1} />

      <div className="gal-panel" ref={panelRef} tabIndex={-1}>
        <header className="gal-head">
          <div>
            <span className="eyebrow">
              {trip.region} · {trip.date}
            </span>
            <h2>{trip.place}</h2>
          </div>
          <button className="gal-close" onClick={onClose} aria-label="Close gallery">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        <div className="gal-body">
          {rows.map((row, ri) => (
            <div key={ri}>
              <div className="gal-grid">
                {row.shots.map((shot, si) => (
                  <figure
                    key={si}
                    className={`gal-cell${shot.span ? ` ${shot.span}` : ""}`}
                    style={{ "--d": `${Math.min(si, 5) * 70}ms` } as React.CSSProperties}
                  >
                    {shot.src ? (
                      // Plain <img>: these are user-supplied paths that may not
                      // exist yet, and next/image would hard-fail on a missing
                      // file rather than degrade.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={shot.src} alt={shot.alt ?? trip.place} loading="lazy" />
                    ) : (
                      <Placeholder seed={`${trip.slug}-${ri}-${si}`} />
                    )}
                  </figure>
                ))}
              </div>
              {row.line ? <p className="gal-line">{row.line}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}

/* ------------------------------------------------------------------ *
 * Rail
 * ------------------------------------------------------------------ */

export default function OffTheClock() {
  const [open, setOpen] = useState<Trip | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const returnTo = useRef<HTMLElement | null>(null);

  const measure = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(max <= 1 || el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const step = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-trip]");
    el.scrollBy({ left: (card ? card.offsetWidth + 18 : el.clientWidth * 0.8) * dir, behavior: "smooth" });
  };

  const openTrip = (trip: Trip, e: React.MouseEvent<HTMLButtonElement>) => {
    returnTo.current = e.currentTarget;
    setOpen(trip);
  };

  // Send focus back where it came from, or the overlay leaves keyboard users
  // stranded at the top of the document.
  const close = useCallback(() => {
    setOpen(null);
    returnTo.current?.focus();
  }, []);

  return (
    <>
      <div className="trip-rail-wrap">
        <div className="trip-rail" ref={railRef} onScroll={measure}>
          {trips.map((trip) => (
            <button
              key={trip.slug}
              data-trip
              type="button"
              className="trip reveal"
              onClick={(e) => openTrip(trip, e)}
              aria-label={`${trip.place}, ${trip.region} — open photographs`}
            >
              <span className="trip-frame">
                {trip.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={trip.cover} alt="" loading="lazy" />
                ) : (
                  <Placeholder seed={trip.slug} />
                )}
                <span className="trip-shade" />
                {trip.kind ? <span className="trip-kind">{trip.kind}</span> : null}
                <span className="trip-open">
                  {trip.gallery.length} photographs
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 12h13m0 0-5-5m5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
              <span className="trip-meta">
                <b>{trip.place}</b>
                <i>
                  {trip.region} · {trip.date}
                </i>
              </span>
            </button>
          ))}
        </div>

        <div className="trip-controls">
          <button className="arrow" type="button" onClick={() => step(-1)} disabled={atStart} aria-label="Previous places">
            <Chevron dir="left" />
          </button>
          <button className="arrow" type="button" onClick={() => step(1)} disabled={atEnd} aria-label="More places">
            <Chevron dir="right" />
          </button>
          <span className="rail-hint">Open a place to see the set</span>
        </div>
      </div>

      {open ? <Gallery trip={open} onClose={close} /> : null}
    </>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={dir === "left" ? "M15 5 8 12l7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
