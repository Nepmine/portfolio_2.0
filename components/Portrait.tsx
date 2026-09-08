"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef } from "react";

/**
 * The hero portrait, built as an arch that dissolves into the shader field
 * rather than as a photograph in a box.
 *
 * Three things do the work: the arch silhouette (so there is no rectangle), a
 * mask that fades the base to nothing (so there is no bottom edge), and a
 * colour grade that pulls the photo into the site palette (so it does not read
 * as a pasted JPEG). The tilt is what makes it feel like an object with depth
 * — the halo behind and the sheen on the surface move against each other.
 */
export default function Portrait({ src, alt }: { src: StaticImageData; alt: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    // Target vs current, lerped on a frame loop. Writing the transform straight
    // from the pointer event makes the tilt feel twitchy and tied to mouse
    // polling rate; easing toward a target gives it weight.
    const state = { x: 0, y: 0, tx: 0, ty: 0, active: 0, tActive: 0 };
    let raf = 0;

    const frame = () => {
      state.x += (state.tx - state.x) * 0.08;
      state.y += (state.ty - state.y) * 0.08;
      state.active += (state.tActive - state.active) * 0.08;

      const rx = (-state.y * 7).toFixed(3);
      const ry = (state.x * 9).toFixed(3);
      stage.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      // Drives the sheen position and the halo offset from the same numbers,
      // so every layer agrees on where the light is coming from.
      stage.style.setProperty("--tilt-x", state.x.toFixed(3));
      stage.style.setProperty("--tilt-y", state.y.toFixed(3));
      stage.style.setProperty("--tilt-on", state.active.toFixed(3));

      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const box = root.getBoundingClientRect();
      // Normalised against a box padded well beyond the arch, so the tilt
      // starts responding before the cursor actually reaches the photo.
      const px = (e.clientX - (box.left + box.width / 2)) / (box.width * 0.9);
      const py = (e.clientY - (box.top + box.height / 2)) / (box.height * 0.9);
      state.tx = Math.max(-1, Math.min(1, px));
      state.ty = Math.max(-1, Math.min(1, py));
      state.tActive = 1;
    };

    const onLeave = () => {
      state.tx = 0;
      state.ty = 0;
      state.tActive = 0;
    };

    // Scoped to the hero, not the window: the arch is an object that responds
    // when you are near it and settles back to rest when you leave. It is not a
    // thing that tracks the cursor around the page.
    const scope = root.closest("section") ?? root;
    scope.addEventListener("pointermove", onMove as EventListener, { passive: true });
    scope.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      scope.removeEventListener("pointermove", onMove as EventListener);
      scope.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="portrait" ref={rootRef}>
      <div className="portrait-stage" ref={stageRef}>
        <span className="portrait-halo" aria-hidden="true" />

        <div className="portrait-arch">
          <Image
            src={src}
            alt={alt}
            priority
            sizes="(max-width: 980px) 78vw, 26rem"
            placeholder="blur"
          />
          <span className="portrait-grade" aria-hidden="true" />
          <span className="portrait-sheen" aria-hidden="true" />
        </div>

        <span className="portrait-base" aria-hidden="true" />
      </div>
    </div>
  );
}
