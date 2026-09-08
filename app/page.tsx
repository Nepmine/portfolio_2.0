import FeaturedWork from "@/components/FeaturedWork";
import OffTheClock from "@/components/OffTheClock";
import Portrait from "@/components/Portrait";
import ProjectRail from "@/components/ProjectRail";
import ShaderBackdrop from "@/components/ShaderBackdrop";
import SiteNav from "@/components/SiteNav";
import { archiveProjects, eraLabels, productionCount, projects } from "@/lib/projects";
import { site } from "@/lib/site";
import portrait from "@/public/my_image.jpg";

/**
 * Counted from the data rather than typed in, so the hero can never claim a
 * number the project list does not back up.
 */
const stats = [
  { value: String(projects.length), label: "Projects built" },
  { value: String(productionCount), label: "In production" },
  { value: "2021", label: "Building since" },
];

/**
 * What I work with, grouped by what it lets me do rather than by where it runs.
 * "Front end / back end" is a résumé's framing; this says the same things about
 * the same technologies while making a point about how the work gets done.
 */
const craft = [
  {
    title: "From empty repo to production",
    body: "I take a product the whole way: server rendering and caching that keep it fast, an API and schema that hold up, and a deploy that stays up afterwards.",
    stack: ["TypeScript", "Next.js", "Fastify", "Node.js", "PostgreSQL"],
  },
  {
    title: "The data model comes first",
    body: "Tenant isolation, role-based access and editorial workflows are decisions about data, not about screens. Get them wrong and no amount of interface saves it.",
    stack: ["PostgreSQL", "SQL Server", "MongoDB", "TypeORM", "GraphQL", "REST"],
  },
  {
    title: "Interfaces that hold up",
    body: "Built in whichever framework the team already runs, with the state and rendering decisions made deliberately instead of inherited from a tutorial.",
    stack: ["React", "Angular", "Next.js", "TypeScript", "HTML and CSS"],
  },
  {
    title: "Systems, not screens",
    body: "Services that talk to each other through events rather than through each other's databases, shipped inside the review and delivery process a real team runs on.",
    stack: ["Apache Kafka", "Event-driven pub-sub", "NestJS", ".NET", "Git and code review", "Agile delivery"],
  },
];

export default function Home() {
  const marquee = [...projects, ...projects];

  return (
    <>
      <SiteNav />

      <main id="main">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="hero-section" id="top">
          <ShaderBackdrop className="hero-shader" />
          <div className="hero-veil" aria-hidden="true" />

          <div className="shell hero">
            <div className="hero-copy">
              <span className="hero-badge glass">
                <span className="status" aria-hidden="true" />
                Open to product work
              </span>

              <h1>
                <span className="line">
                  <span>I build web</span>
                </span>
                <span className="line">
                  <span>platforms that</span>
                </span>
                <span className="line">
                  <span>
                    go into <span className="grad-warm">production</span>.
                  </span>
                </span>
              </h1>

              <div className="fade-in">
                <p className="hero-lede">
                  Full-stack developer in {site.location}. I ship client features at{" "}
                  <strong>Bridgenext</strong> and build our own products with{" "}
                  <strong>Mahavi</strong> — CMS-backed platforms, multi-tenant systems, and
                  the APIs underneath them.
                </p>

                <div className="hero-actions">
                  <a className="btn btn-solid" href="#work">
                    See the work
                    <ArrowRight />
                  </a>
                  <a className="btn" href={`mailto:${site.email}`}>
                    <Mail />
                    Email me
                  </a>
                </div>
              </div>

              <dl className="hero-now fade-in delay">
                <div>
                  <dt>Full-time</dt>
                  <dd>Bridgenext — Software Developer</dd>
                </div>
                <div>
                  <dt>With the team</dt>
                  <dd>Mahavi — Core developer</dd>
                </div>
              </dl>

              <div className="hero-stats fade-in delay">
                {stats.map((s) => (
                  <div key={s.label}>
                    <b>{s.value}</b>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <Portrait
              src={portrait}
              alt={`${site.name}, full-stack developer based in ${site.location}`}
            />
          </div>

          <div className="shell">
            <div className="marquee" aria-hidden="true">
              <div className="marquee-track">
                {marquee.map((p, i) => (
                  <span className="marquee-item" key={`${p.slug}-${i}`}>
                    <b>{p.title}</b>
                    <i>{eraLabels[p.era]}</i>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Featured work ────────────────────────────────────────────── */}
        <section className="shell section" id="work">
          <div className="section-head">
            <div>
              <span className="eyebrow reveal">Selected work</span>
              <h2 className="reveal">Three that went live</h2>
            </div>
            <p className="reveal">
              Production platforms built with the Mahavi team and still running: a
              CMS-backed site for an Australian client, a multi-tenant restaurant system,
              and a help platform for Nepali users at home and abroad.
            </p>
          </div>

          <FeaturedWork />
        </section>

        {/* ── Archive ──────────────────────────────────────────────────── */}
        <section className="shell section" id="archive">
          <div className="section-head">
            <div>
              <span className="eyebrow reveal">The archive</span>
              <h2 className="reveal">{archiveProjects.length} more, in order</h2>
            </div>
            <p className="reveal">
              Everything else I have built — the studio site, the Bridgenext full-stack
              work, and four years of college projects from C and Java to Kotlin. Filter
              by where it was built.
            </p>
          </div>
          <div className="reveal">
            <ProjectRail />
          </div>
        </section>

        {/* ── Craft ────────────────────────────────────────────────────── */}
        <section className="shell section" id="craft">
          <div className="section-head">
            <div>
              <span className="eyebrow reveal">How I work</span>
              <h2 className="reveal">What I actually do with it</h2>
            </div>
            <p className="reveal">
              Mostly TypeScript on both ends. I care more about how a system is shaped
              than which framework draws it — so here is the work each of these is for,
              rather than a list of logos.
            </p>
          </div>

          <div className="craft" data-stagger>
            {craft.map((c, i) => (
              <article className="craft-card glass edge-lit reveal" key={c.title}>
                <span className="craft-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <ul>
                  {c.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="craft-note reveal">
            Also fluent in <strong>Java</strong>, <strong>C</strong> and{" "}
            <strong>Kotlin</strong> when a problem calls for them, and I build with{" "}
            <strong>Claude and coding agents</strong> daily.
          </p>
        </section>

        {/* ── Path ─────────────────────────────────────────────────────── */}
        <section className="shell section" id="path">
          <div className="section-head">
            <div>
              <span className="eyebrow reveal">The path</span>
              <h2 className="reveal">Where I am, and how I got here</h2>
            </div>
            <p className="reveal">
              Newest first. Five years, in reverse: shipping and owning products now,
              enterprise development before that, and the fundamentals learned the hard
              way underneath it all.
            </p>
          </div>

          <ol className="timeline">
            <li className="tl-row reveal">
              <div className="tl-when">
                <span className="tl-live">Now</span>
              </div>
              <div className="tl-what">
                <h3>Software Developer</h3>
                <div className="tl-where">Bridgenext</div>
                <p>
                  Developing and maintaining production features in React, Angular and
                  NestJS on real client products. Hands-on with Apache Kafka and
                  event-driven pub-sub architecture, plus APIs, databases and enterprise
                  application architecture.
                </p>
                <p>
                  Work happens with cross-functional teams under Git-based workflows, code
                  review, Agile practice and enterprise delivery standards.
                </p>
              </div>
            </li>

            <li className="tl-row reveal">
              <div className="tl-when">
                <span className="tl-live">Now</span>
              </div>
              <div className="tl-what">
                <h3>Core developer</h3>
                <div className="tl-where">Mahavi</div>
                <p>
                  A four-person team building our own products and taking on client work.
                  I sit on the core dev side — Next.js, Fastify and PostgreSQL — shipping
                  a CMS-backed platform for an Australian client, a multi-tenant restaurant
                  management system, helpnepali.com, and the studio site itself.
                </p>
              </div>
            </li>

            <li className="tl-row reveal">
              <div className="tl-when">Internship</div>
              <div className="tl-what">
                <h3>Software Development Intern</h3>
                <div className="tl-where">Bridgenext</div>
                <p>
                  Six months full-time, building full-stack projects across React, Angular,
                  Node.js, NestJS, GraphQL, TypeORM, SQL Server and MongoDB, and learning
                  how enterprise development workflows actually run day to day. It became
                  the developer role above.
                </p>
              </div>
            </li>

            <li className="tl-row reveal">
              <div className="tl-when">2021 — 2025</div>
              <div className="tl-what">
                <h3>B.Tech, Computer Engineering</h3>
                <div className="tl-where">
                  Rajarambapu Institute of Technology, Sakharale, Maharashtra
                </div>
                <p>
                  Graduated with a CGPA of 8.28. Spent the four years building far more
                  than the syllabus asked for: games in C and Java, an Android app in
                  Kotlin, a client website, and a video-based learning platform with a
                  team.
                </p>
              </div>
            </li>
          </ol>
        </section>

        {/* ── Off the clock ────────────────────────────────────────────── */}
        <section className="section off" id="off">
          <div className="shell">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">Off the clock</span>
                <h2 className="reveal">Where I go when I&rsquo;m not building</h2>
              </div>
              <p className="reveal">
                Coastlines, hill stations and the long way round. Open a place to see the
                set.
              </p>
            </div>
          </div>
          <OffTheClock />
        </section>

        {/* ── Contact ──────────────────────────────────────────────────── */}
        <section className="shell section" id="contact">
          <div className="contact-panel glass reveal">
            <div className="contact">
              <div>
                <span className="eyebrow">Contact</span>
                <h2>Have something worth building?</h2>
                <p>
                  I am open to interesting product work, whether that is a full platform or
                  one hard part of one. The fastest way to reach me is email.
                </p>
                <a className="btn btn-solid" href={`mailto:${site.email}`}>
                  Start a conversation
                  <ArrowRight />
                </a>
              </div>
              <div className="contact-list">
                <a href={`mailto:${site.email}`}>
                  {site.email} <em>Email</em>
                </a>
                <a href={site.github} target="_blank" rel="noreferrer noopener">
                  GitHub <em>Code</em>
                </a>
                <a href={site.linkedin} target="_blank" rel="noreferrer noopener">
                  LinkedIn <em>Profile</em>
                </a>
                <a href="https://mahavi.tech" target="_blank" rel="noreferrer noopener">
                  mahavi.tech <em>Team</em>
                </a>
                <span>
                  {site.location} <em>Based in</em>
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="shell footer">
        <span>© {new Date().getFullYear()} Suraj Ghimire</span>
        <span>Built with Next.js in Lumbini, Nepal</span>
        <a className="to-top" href="#top">
          <ArrowUp />
          Back to top
        </a>
      </footer>
    </>
  );
}

/* ── Icons ── */

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h13m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUp() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 19V5m0 0-6 6m6-6 6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Mail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="m4 8 7.1 4.7a1.6 1.6 0 0 0 1.8 0L20 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
