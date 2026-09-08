"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's backdrop: a domain-warped fractal-noise field rendered on the GPU.
 *
 * It is one idea rather than a pile of effects — a slow, continuous flow in the
 * site's own palette, so the hero reads as lit weather rather than as a stack of
 * decorations. Everything else in the hero (the portrait's halo, the grain, the
 * section fade) is tuned against these exact colours.
 *
 * Deliberately time-driven only. Nothing here tracks the cursor: the one warm
 * source sits fixed in the upper right, which is the direction every shadow and
 * hover highlight in the page is lit from.
 *
 * Costs nothing when it cannot pay for itself: no WebGL2, reduced motion, a
 * hidden tab or a scrolled-past hero all stop the loop, and the CSS aurora
 * underneath carries the design on its own.
 */

const VERT = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;

uniform vec2  uRes;
uniform float uTime;
out vec4 outColor;

// -- value noise -----------------------------------------------------------
float hash(vec2 p) {
  p = fract(p * vec2(233.34, 851.73));
  p += dot(p, p + 23.45);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);        // smoothstep
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);     // decorrelates the octaves
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv   = frag / uRes;
  vec2 p    = (frag - 0.5 * uRes) / uRes.y;

  p *= 1.35;

  float t = uTime * 0.028;

  // Two rounds of domain warping. The second round is what turns plain fbm
  // into something with current and eddies instead of clouds.
  vec2 q = vec2(
    fbm(p + vec2(0.0, 0.0) + t),
    fbm(p + vec2(5.2, 1.3) - t * 0.8)
  );
  vec2 r = vec2(
    fbm(p + 2.0 * q + vec2(1.7, 9.2) + t * 0.42),
    fbm(p + 2.0 * q + vec2(8.3, 2.8) - t * 0.31)
  );
  float f = fbm(p + 2.1 * r);

  // -- palette: the CSS tokens, in linear-ish space -------------------------
  const vec3 abyss    = vec3(0.020, 0.058, 0.049);   // below --pine-950
  const vec3 pine     = vec3(0.078, 0.180, 0.148);   // --pine-700
  const vec3 pineLit  = vec3(0.133, 0.275, 0.227);   // --pine-600
  const vec3 jade     = vec3(0.247, 0.682, 0.525);   // --jade
  const vec3 marigold = vec3(0.914, 0.635, 0.231);   // --marigold

  vec3 col = mix(abyss, pine, smoothstep(0.18, 0.72, f));
  col = mix(col, pineLit, smoothstep(0.52, 0.95, f) * 0.85);

  // Jade rides the warp vectors, so the cool light follows the flow lines.
  col = mix(col, jade, smoothstep(0.62, 1.05, f + r.y * 0.35) * 0.16);

  // A single warm source in the upper right, the same direction every shadow
  // in the page falls away from.
  float warm = smoothstep(1.05, 0.15, distance(uv, vec2(0.82, 0.92)));
  col = mix(col, marigold, warm * warm * (0.10 + 0.16 * smoothstep(0.45, 0.9, f)));

  // Filaments: the ridges of the warp field, kept faint.
  float ridge = pow(1.0 - abs(f - 0.5) * 2.0, 7.0);
  col += marigold * ridge * 0.05;

  // Settle the bottom into the page background so the section has no seam.
  col = mix(col, abyss, smoothstep(0.42, 0.0, uv.y) * 0.85);

  // Corner falloff, then dithering — banding is very visible across a field
  // this dark and this smooth.
  float vig = smoothstep(1.25, 0.35, length((uv - 0.5) * vec2(1.15, 1.0)));
  col *= 0.35 + 0.65 * vig;
  col += (hash(frag + fract(uTime)) - 0.5) * 0.012;

  outColor = vec4(col, 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function ShaderBackdrop({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let running = false;
    let start = performance.now();
    let elapsed = 0;

    const resize = () => {
      // The field is smooth by construction, so rendering at roughly half
      // resolution is free quality: it costs a quarter of the fragments and
      // is indistinguishable once scaled up.
      const scale = Math.min(window.devicePixelRatio || 1, 2) * 0.55;
      const w = Math.max(1, Math.round(canvas.offsetWidth * scale));
      const h = Math.max(1, Math.round(canvas.offsetHeight * scale));
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };

    const draw = (time: number) => {
      gl.uniform1f(uTime, time);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const frame = (now: number) => {
      elapsed = (now - start) / 1000;
      draw(elapsed);
      raf = requestAnimationFrame(frame);
    };

    const play = () => {
      if (running || reduced.matches) return;
      running = true;
      start = performance.now() - elapsed * 1000;  // resume where it paused
      raf = requestAnimationFrame(frame);
    };

    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    draw(0);                                   // paint one frame immediately

    const onResize = () => {
      resize();
      if (!running) draw(elapsed);
    };
    window.addEventListener("resize", onResize);

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting && !document.hidden ? play() : pause()),
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? pause() : play());
    document.addEventListener("visibilitychange", onVisibility);

    const onMotionChange = () => (reduced.matches ? pause() : play());
    reduced.addEventListener("change", onMotionChange);

    return () => {
      pause();
      io.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onMotionChange);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
