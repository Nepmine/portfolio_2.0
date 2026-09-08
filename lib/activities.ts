/**
 * "Off the clock" — places, not projects.
 *
 * Every image field is a plain path under /public. Until a real photo is
 * dropped in, leaving `src` out renders a designed placeholder in the site
 * palette rather than a broken frame, so the section looks finished while it
 * waits for you. To fill one in:
 *
 *   1. drop the file in  public/travel/<place>/<name>.jpg
 *   2. set  src: "/travel/<place>/<name>.jpg"
 *
 * `lines` are the one-liners woven between the gallery rows. Keep them short —
 * they are set large and they carry the whole mood of the set.
 */

export type Shot = {
  /** Path under /public. Omit to render the placeholder for this frame. */
  src?: string;
  /** Alt text. Falls back to the place name when omitted. */
  alt?: string;
  /** "wide" spans two columns in the gallery, "tall" spans two rows. */
  span?: "wide" | "tall";
};

export type Trip = {
  slug: string;
  place: string;
  region: string;
  date: string;
  /** Shown on the rail card. Omit to use the placeholder. */
  cover?: string;
  /** Optional tag on the rail card, e.g. "Trek". */
  kind?: string;
  /** Poetic one-liners, interleaved between the gallery rows. */
  lines: string[];
  gallery: Shot[];
};

export const trips: Trip[] = [
  {
    slug: "goa",
    place: "Goa",
    region: "India",
    date: "2025",
    kind: "Coast",
    lines: ["We stood still, and the waves told the story."],
    gallery: [
      { span: "wide" },
      {},
      {},
      { span: "tall" },
      {},
      {},
    ],
  },
  {
    slug: "matheran",
    place: "Matheran",
    region: "Maharashtra",
    date: "2024",
    kind: "Trek",
    lines: ["No engines past the gate. Only the sound of getting there."],
    gallery: [{}, { span: "tall" }, {}, { span: "wide" }, {}],
  },
  {
    slug: "kokan",
    place: "Kokan",
    region: "Maharashtra",
    date: "2024",
    kind: "Coast",
    lines: ["Red earth, green water, and a road that keeps its own time."],
    gallery: [{ span: "wide" }, {}, {}, {}, { span: "tall" }],
  },
  {
    slug: "lumbini",
    place: "Lumbini",
    region: "Nepal",
    date: "Home",
    kind: "Home",
    lines: ["The place I keep coming back to."],
    gallery: [{}, { span: "wide" }, {}, {}],
  },
];
