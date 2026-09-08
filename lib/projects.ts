export type Era = "mahavi" | "bridgenext" | "college";

export type Project = {
  slug: string;
  title: string;
  kind: string;
  era: Era;
  period: string;
  stack: string[];
  /** One line. Carries the project on its own — the card shows only this. */
  summary: string;
  /** The long version, revealed on demand rather than dumped on the page. */
  description: string;
  link?: { label: string; href: string };
  highlights?: string[];
};

export const eraLabels: Record<Era, string> = {
  mahavi: "Mahavi",
  bridgenext: "Bridgenext",
  college: "College",
};

/** Shown under the filter chips, so choosing an era explains itself. */
export const eraBlurbs: Record<Era, string> = {
  mahavi: "Our own team's work. Shipped, handed over, still running.",
  bridgenext: "Enterprise full-stack, built to somebody else's standards — which is its own skill.",
  college: "Four years of building things nobody asked for. That turned out to be the point.",
};

export const projects: Project[] = [
  {
    slug: "radhakunda",
    title: "Radhakunda",
    kind: "Full-stack platform with CMS",
    era: "mahavi",
    period: "Production",
    stack: ["Next.js", "Fastify", "PostgreSQL", "TypeScript"],
    summary:
      "A spiritual research organisation in Australia runs on code written in Lumbini.",
    description:
      "Built and deployed as part of the core development team at Mahavi. The public site carries the organisation's research, events and educational material; behind it sits a full CMS and admin dashboard — editorial workflows, usage statistics, and role-based access so staff only reach what belongs to them. Next.js handles rendering, caching and search visibility. Fastify and PostgreSQL run the API and the data underneath.",
    highlights: [
      "CMS and admin dashboard with role-based access control",
      "Server-rendered public site tuned for search and caching",
      "Fastify API over PostgreSQL",
    ],
  },
  {
    slug: "rms-platform",
    title: "RMS Platform",
    kind: "Multi-tenant restaurant management system",
    era: "mahavi",
    period: "Production",
    stack: ["React", "Node.js", "Fastify", "PostgreSQL"],
    summary:
      "Runs a restaurant end to end — and catches an allergy conflict before the waiter can.",
    description:
      "One system for the whole dine-in flow: customisable menus, table ordering, waiter calls, quantity-based pricing and invoicing. Behind it, an admin side with role-based access, staff and inventory management, analytics, scheduled backups, and AI-assisted allergy detection that flags conflicting ingredients before an order is confirmed. Every restaurant gets isolated data and its own configuration on shared infrastructure — which is the hard part, and the reason it was worth building properly.",
    highlights: [
      "Tenant isolation with per-restaurant configuration",
      "Menus, ordering, waiter calls, invoicing",
      "Inventory, analytics, backups, AI allergy checks",
    ],
  },
  {
    slug: "help-nepali",
    title: "Help Nepali",
    kind: "Community help platform",
    era: "mahavi",
    period: "Recent",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    summary:
      "Somewhere for Nepali people to find the help they are actually looking for, at home and abroad.",
    description:
      "Practical help is usually out there and almost never findable. This is an attempt to fix the findable half: server-rendered for fast first loads and search visibility, structured content so listings surface properly, and an admin side so they stay current instead of quietly rotting.",
    link: { label: "helpnepali.com", href: "https://helpnepali.com" },
  },
  {
    slug: "mahavi-tech",
    title: "mahavi.tech",
    kind: "Studio website",
    era: "mahavi",
    period: "Production",
    stack: ["Next.js", "TypeScript", "CSS"],
    summary: "The site for the team I build with. Static-first, and it actually ranks.",
    description:
      "Designed and built the public site for Mahavi: what the team does, the work it has shipped, and how to reach it. Static-first for speed, with metadata and structured data set up properly — so the studio surfaces in search rather than existing only for people who already know the URL.",
    link: { label: "mahavi.tech", href: "https://mahavi.tech" },
  },
  {
    slug: "movieverse",
    title: "MovieVerse",
    kind: "Movie browsing and search platform",
    era: "bridgenext",
    period: "Full stack",
    stack: ["Angular", "NestJS", "GraphQL", "TypeORM", "SQL Server"],
    summary:
      "Find a film by genre, title, actor or producer. Keep favourites. Never think about the login again.",
    description:
      "A film catalogue built around querying it properly: explore by genre, title, actor or producer, see top hits, save favourites to an account. Authentication runs on JWTs with hashed passwords. Data sits in SQL Server through TypeORM, exposed by a GraphQL API served from NestJS, with Angular driving the front end.",
    highlights: [
      "GraphQL schema over TypeORM entities",
      "JWT auth with password hashing",
      "Personalised favourites and top-hit lists",
    ],
  },
  {
    slug: "elequent-academy",
    title: "Elequent Academy",
    kind: "Full-stack web application",
    era: "bridgenext",
    period: "Full stack",
    stack: ["React", "NestJS", "TypeORM", "SQL Server"],
    summary:
      "Create, edit, complete, clear. The unglamorous CRUD that teaches you a stack properly.",
    description:
      "Users add, edit, delete and complete work items, all persisted to SQL Server through TypeORM. React handles the interactive side; NestJS owns routing, request validation and API logic — so the rules live in one place instead of being scattered across the client and rediscovered later.",
  },
  {
    slug: "task-manager",
    title: "Task Manager",
    kind: "Personal productivity web app",
    era: "bridgenext",
    period: "Full stack",
    stack: ["React", "NestJS", "TypeORM", "SQL Server"],
    summary:
      "Built it for myself. It quietly became the sandbox I tested every new pattern in.",
    description:
      "A full-stack task manager — add, edit, delete, complete, all stored in SQL Server via TypeORM. React handles the interface, NestJS the routing, validation and API logic. It started as a tool I actually wanted and turned into the reference project I reached for whenever I needed to try something in this stack before trusting it with real work.",
  },
  {
    slug: "doubtify",
    title: "Doubtify",
    kind: "Expert-based learning platform",
    era: "college",
    period: "Team project",
    stack: ["Node.js", "MongoDB", "WebRTC"],
    summary:
      "Post a doubt, get matched to someone who can answer it, sort it out on a video call. No forum, no three-day wait.",
    description:
      "A team project built as a two-way handshake between learners and experts. Instead of a question dying in a thread, a learner raises a doubt, gets matched to somebody available who can actually answer it, and resolves it live over video. Node.js runs the backend and the matching logic; MongoDB stores users, sessions and doubt history.",
    highlights: [
      "Real-time video doubt resolution",
      "Learner-to-expert matching",
      "Node.js and MongoDB backend",
    ],
  },
  {
    slug: "snaptogarbage",
    title: "SnapToGarbage",
    kind: "Android app for environmental cleanup",
    era: "college",
    period: "Android",
    stack: ["Kotlin", "Android"],
    summary:
      "Photograph litter, drop a pin, turn scattered rubbish into a map somebody can act on.",
    description:
      "An Android app in Kotlin that makes reporting waste as cheap as taking a photo. Snap what you come across, the app records where it was, and the reports build into a shared map of what needs attention. The whole idea was to push the effort of reporting close to zero, on the theory that awareness only becomes action when it stops being a chore.",
  },
  {
    slug: "2048",
    title: "2048",
    kind: "Matrix puzzle game with GUI",
    era: "college",
    period: "C",
    stack: ["C", "Graphics library"],
    summary: "The tile puzzle, written in C. Including the graphics. I do not recommend this.",
    description:
      "Built the entire game in C — grid, merge rules, input handling and rendering, all by hand, with nothing but the language and a graphics library. Doing it this way meant there was nowhere to hide: no framework to absorb a bad decision, no library to make the redraw problem somebody else's. Which is exactly why it was worth doing once.",
  },
  {
    slug: "clickblitz",
    title: "ClickBlitz",
    kind: "Mouse speed and accuracy challenge",
    era: "college",
    period: "Java",
    stack: ["Java", "Swing", "Threads"],
    summary:
      "Hit the dots before the timer does. Java Swing, threads, and an interface that stays responsive while it judges you.",
    description:
      "A desktop game built with Java Swing. Dots appear and the player has a fixed window to click them, with the timing handled on its own thread so the interface never freezes mid-round — which is the actual lesson of the project. It scores accuracy and speed together, and narrows the window as you get better.",
  },
  {
    slug: "tic-tac-toe",
    title: "Tic Tac Toe",
    kind: "Terminal-based graphical game",
    era: "college",
    period: "C",
    stack: ["C", "Terminal UI"],
    summary:
      "Multiplayer, with a real interface, drawn entirely inside a terminal. Opening a window felt like cheating.",
    description:
      "Rather than opening a window, this one renders its whole interface in the terminal. Players navigate with ordinary terminal input and still get a properly laid-out board, so the game runs anywhere a shell does and needs nothing installed to play.",
  },
  {
    slug: "muskan-jewellers",
    title: "Muskan Jewellers",
    kind: "E-commerce website",
    era: "college",
    period: "Client work",
    stack: ["HTML", "CSS", "JavaScript"],
    summary:
      "A storefront for a jewellery shop, built so the collection gets the room and the layout gets out of the way.",
    description:
      "A responsive site for a jewellery shop that needed its pieces to be the whole point. The layout gives them space and holds together across screen sizes, with HTML and CSS carrying the presentation and JavaScript adding only the interaction that keeps browsing smooth. My first real client, and the first time a deadline belonged to somebody else.",
  },
  {
    slug: "carbon-hackathon",
    title: "Paperless Manuals",
    kind: "Hackathon project on carbon reduction",
    era: "college",
    period: "Hackathon",
    stack: ["ICT", "Mobile"],
    summary:
      "A hackathon answer to a deeply unglamorous problem: printed product manuals, and the paper they waste.",
    description:
      "Built at a hackathon on carbon reduction. Most teams reached for the big, abstract version of the problem. We took a small, specific, boring source of waste — the printed manual nobody reads that ships in every box — and built an application to digitise it, so the same information reaches people without the paper behind it.",
  },
];

export const eras: Era[] = ["mahavi", "bridgenext", "college"];

/**
 * The three that get the large treatment, in the order they are shown. Ordered
 * by hand rather than by era or date: Help Nepali leads because it is the one a
 * visitor can open and use immediately.
 */
export const featuredSlugs = ["help-nepali", "radhakunda", "rms-platform"] as const;

const bySlug = new Map(projects.map((p) => [p.slug, p]));

export const featuredProjects: Project[] = featuredSlugs.map((slug) => {
  const project = bySlug.get(slug);
  // A typo in featuredSlugs would otherwise fail silently as a gap in the page.
  if (!project) throw new Error(`featuredSlugs references unknown project: ${slug}`);
  return project;
});

/** Everything the featured row does not already show, in source order. */
export const archiveProjects: Project[] = projects.filter(
  (p) => !featuredSlugs.includes(p.slug as (typeof featuredSlugs)[number]),
);

/** Drives the hero counter, so the number can never drift from the data. */
export const productionCount = projects.filter((p) => p.period === "Production").length;
