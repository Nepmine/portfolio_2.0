export type Era = "mahavi" | "bridgenext" | "college";

export type Project = {
  slug: string;
  title: string;
  kind: string;
  era: Era;
  period: string;
  stack: string[];
  summary: string;
  description: string;
  link?: { label: string; href: string };
  highlights?: string[];
};

export const eraLabels: Record<Era, string> = {
  mahavi: "Mahavi",
  bridgenext: "Bridgenext",
  college: "College",
};

export const eraBlurbs: Record<Era, string> = {
  mahavi: "Products built with the Mahavi team, shipped and maintained in production.",
  bridgenext: "Full-stack work built during the internship and developer role at Bridgenext.",
  college: "Four years of building things to learn how they work, from C to Kotlin.",
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
      "A production platform for an Australian client running spiritual research, events and educational programmes.",
    description:
      "Built and deployed as part of the core development team at Mahavi. The platform carries public content, event listings and educational material for the organisation, backed by a full content management system and admin dashboard: usage statistics, editorial workflows and role-based access control so staff only reach what belongs to them. Next.js handles server rendering, caching and search visibility for the public site; Fastify and PostgreSQL run the API and data layer.",
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
      "One platform that runs a restaurant end to end, built to host many restaurants at once.",
    description:
      "A multi-tenant system that digitises the whole dine-in flow: customisable menus, table ordering, waiter calls, quantity-based pricing and invoice generation. Behind it sits an admin system with role-based access control, staff and inventory management, analytics, scheduled data backups and AI-assisted allergy detection that flags conflicting ingredients before an order is confirmed. Each restaurant gets isolated data and its own configuration on shared infrastructure.",
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
      "A web platform connecting Nepali people with the help, information and services they are looking for.",
    description:
      "A recent build aimed at making practical help easier to find for Nepali users at home and abroad. The site is server-rendered for fast first loads and search visibility, with structured content and an admin side for keeping listings current.",
    link: { label: "helpnepali.com", href: "https://helpnepali.com" },
  },
  {
    slug: "mahavi-tech",
    title: "mahavi.tech",
    kind: "Studio website",
    era: "mahavi",
    period: "Production",
    stack: ["Next.js", "TypeScript", "CSS"],
    summary:
      "The website for Mahavi, the team I build personal and client projects with.",
    description:
      "Designed and built the public site for Mahavi: what the team does, the work it has shipped and how to reach it. Static-first for speed, with metadata and structured data set up so the studio actually surfaces in search.",
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
      "Browse films by genre, title, actor or producer, keep favourites, stay logged in securely.",
    description:
      "A film catalogue with rich querying: explore by genre, title, actor or producer, see top hits and save favourites to an account. Authentication uses JWTs with hashed passwords. Data lives in SQL Server through TypeORM, exposed by a GraphQL API served from NestJS, with an Angular front end driving the interface.",
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
      "A task and progress tool where users create, edit, complete and clear their work items.",
    description:
      "Users add, edit, delete and mark items complete, with everything persisted to SQL Server through TypeORM. React handles the interactive interface while NestJS owns routing, request validation and API logic, keeping the data rules in one place rather than spread across the client.",
  },
  {
    slug: "task-manager",
    title: "Task Manager",
    kind: "Personal productivity web app",
    era: "bridgenext",
    period: "Full stack",
    stack: ["React", "NestJS", "TypeORM", "SQL Server"],
    summary:
      "The productivity tool I built for myself to learn the React and NestJS stack end to end.",
    description:
      "A full-stack task manager: add, edit, delete and complete tasks, all stored in SQL Server via TypeORM. React handles a clean, interactive UI while NestJS manages routing, validation and API logic. It started as a personal tool and became the reference project I reached for whenever I needed to test a pattern in the stack.",
  },
  {
    slug: "doubtify",
    title: "Doubtify",
    kind: "Expert-based learning platform",
    era: "college",
    period: "Team project",
    stack: ["Node.js", "MongoDB", "WebRTC"],
    summary:
      "Learners post a doubt, an available expert picks it up, and the two talk it through on video.",
    description:
      "A team project built as a two-way handshake between learners and experts. Instead of waiting on a forum thread, a learner raises a doubt and gets matched to someone who can answer it, resolving it live over a video call. Node.js runs the backend and matching logic, with MongoDB storing users, sessions and doubt history.",
    highlights: ["Real-time video doubt resolution", "Learner-to-expert matching", "Node.js and MongoDB backend"],
  },
  {
    slug: "snaptogarbage",
    title: "SnapToGarbage",
    kind: "Android app for environmental cleanup",
    era: "college",
    period: "Android",
    stack: ["Kotlin", "Android"],
    summary:
      "Photograph litter, mark where it is, and turn scattered waste into something a community can act on.",
    description:
      "An Android app built in Kotlin that makes cleanup reporting as simple as taking a photo. Users snap waste they come across, the app records the location, and the reports build into a shared map of what needs attention. The idea was to lower the effort of reporting to almost nothing so that awareness turns into action.",
  },
  {
    slug: "2048",
    title: "2048",
    kind: "Matrix puzzle game with GUI",
    era: "college",
    period: "C",
    stack: ["C", "Graphics library"],
    summary:
      "The tile-sliding puzzle, written from scratch in C with its own graphical interface.",
    description:
      "Built the whole game in C, including the graphical interface, using nothing but the language and a graphics library. Tiles merge on a matrix, the board fills, and the numbers climb as the space runs out. Doing it in C meant handling the grid, the merge rules, input and rendering by hand, which is exactly why it was worth doing.",
  },
  {
    slug: "clickblitz",
    title: "ClickBlitz",
    kind: "Mouse speed and accuracy challenge",
    era: "college",
    period: "Java",
    stack: ["Java", "Swing", "Threads"],
    summary:
      "Hit the dots before the timer does. A desktop game about precision under pressure.",
    description:
      "A desktop game built with Java Swing and threads. Dots appear and the player has a fixed window to click them, with the timing handled on its own thread so the interface stays responsive. It scores both accuracy and speed, and tightens the window as the player improves.",
  },
  {
    slug: "tic-tac-toe",
    title: "Tic Tac Toe",
    kind: "Terminal-based graphical game",
    era: "college",
    period: "C",
    stack: ["C", "Terminal UI"],
    summary:
      "A multiplayer game with a real interface, drawn entirely inside the terminal.",
    description:
      "Rather than opening a window, this one renders its interface in the terminal itself. Players navigate and interact using ordinary terminal input while getting a visually laid-out board, so the whole game runs without any external application.",
  },
  {
    slug: "muskan-jewellers",
    title: "Muskan Jewellers",
    kind: "E-commerce website",
    era: "college",
    period: "Client work",
    stack: ["HTML", "CSS", "JavaScript"],
    summary:
      "A responsive storefront for a jewellery shop, built to make the collection the whole point.",
    description:
      "A responsive website for a jewellery shop to show its collection well. The layout gives the pieces room and holds up across screen sizes, with HTML and CSS handling the presentation and JavaScript adding the interactive pieces that keep browsing smooth.",
  },
  {
    slug: "carbon-hackathon",
    title: "Paperless Manuals",
    kind: "Hackathon project on carbon reduction",
    era: "college",
    period: "Hackathon",
    stack: ["ICT", "Mobile"],
    summary:
      "A hackathon answer to paper waste: replace printed manuals with an app.",
    description:
      "Built at a hackathon focused on carbon reduction. Our team took a specific, unglamorous source of waste — printed product manuals — and built an application to digitise them, so the same information reaches people without the paper behind it.",
  },
];

export const eras: Era[] = ["mahavi", "bridgenext", "college"];
