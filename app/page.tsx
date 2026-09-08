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
    title: "Empty repo to production",
    body: "I take a product the whole way. Rendering and caching that keep it quick, a schema that survives its own success, and a deploy that is still standing on Monday morning.",
    stack: ["TypeScript", "Next.js", "Fastify", "Node.js", "PostgreSQL"],
  },
  {
    title: "The data model comes first",
    body: "Tenant isolation, role-based access and editorial workflows are decisions about data, not about screens. Get them wrong and no amount of interface will dig you out.",
    stack: ["PostgreSQL", "SQL Server", "MongoDB", "TypeORM", "GraphQL", "REST"],
  },
  {
    title: "Interfaces that hold up",
    body: "Built in whichever framework the team already runs. State and rendering decided on purpose, rather than inherited from whichever tutorial was open at the time.",
    stack: ["React", "Angular", "Next.js", "TypeScript", "HTML and CSS"],
  },
  {
    title: "Systems, not screens",
    body: "Services that talk through events instead of reaching into each other's databases. Shipped through the review, the branch, and the delivery process a real team runs on.",
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
              <span className="hero-badge glass glass-blur">
                <span className="status" aria-hidden="true" />
                Open to product work
              </span>

              {/* Three authored lines, each short enough to survive the column
                  without wrapping — the rise animation reads as rhythm only if
                  one line is one line. */}
              <h1>
                <span className="line">
                  <span>
                    My code <span className="grad-warm">runs</span>
                  </span>
                </span>
                <span className="line">
                  <span>in places</span>
                </span>
                <span className="line">
                  <span>I&rsquo;ve never been.</span>
                </span>
              </h1>

              <div className="fade-in">
                <p className="hero-lede">
                  Full-stack developer in {site.location}. Client platforms at{" "}
                  <strong>Bridgenext</strong>, our own products at <strong>Mahavi</strong>.
                  The parts I like best are the ones nobody demos — the schema, the auth,
                  the admin panel, the migration that has to run at two in the morning.
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
              <h2 className="reveal">Three that survived contact with users</h2>
            </div>
            <p className="reveal">
              Built with the Mahavi team, handed over, and still running without me
              watching them. One serves an organisation in Australia, one runs
              restaurants, one helps people find help.
            </p>
          </div>

          <FeaturedWork />
        </section>

        {/* ── Archive ──────────────────────────────────────────────────── */}
        <section className="shell section" id="archive">
          <div className="section-head">
            <div>
              <span className="eyebrow reveal">The archive</span>
              <h2 className="reveal">The other {archiveProjects.length}</h2>
            </div>
            <p className="reveal">
              The studio site, the Bridgenext builds, and four years of college
              projects — including a 2048 clone written in C, graphics and all. Open any
              card for the long version. I stand by most of them.
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
              Mostly TypeScript, both ends. The framework matters far less than the shape
              of the thing underneath it — so rather than a wall of logos, here is what
              each of these is actually for.
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
            <strong>Java</strong>, <strong>C</strong> and <strong>Kotlin</strong> when the
            problem asks for them. And yes — <strong>Claude and coding agents</strong>,
            daily, which mostly means I review a great deal more code than I type.
          </p>
        </section>

        {/* ── Path ─────────────────────────────────────────────────────── */}
        <section className="shell section" id="path">
          <div className="section-head">
            <div>
              <span className="eyebrow reveal">The path</span>
              <h2 className="reveal">Five years, in reverse</h2>
            </div>
            <p className="reveal">
              Two jobs that overlap on purpose. One taught me how software gets built for
              clients at scale; the other lets our team decide everything ourselves.
              Underneath both, four years of building things nobody asked for.
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
                  Production features in React, Angular and NestJS on real client
                  products. Kafka and event-driven pub-sub, APIs, databases, and the
                  enterprise architecture that holds it together.
                </p>
                <p>
                  Cross-functional teams, Git workflows, code review, Agile. The part of
                  the job that is less about writing code and more about it surviving four
                  other people.
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
                  Four of us, building our own products and taking on client work. I sit
                  on the core dev side — Next.js, Fastify, PostgreSQL — and have shipped a
                  CMS-backed platform for an Australian client, a multi-tenant restaurant
                  system, helpnepali.com, and the studio site itself.
                </p>
                <p>
                  No layer of process to hide behind. If it breaks at midnight, it is one
                  of four phones that rings, and often mine.
                </p>
              </div>
            </li>

            <li className="tl-row reveal">
              <div className="tl-when">Internship</div>
              <div className="tl-what">
                <h3>Software Development Intern</h3>
                <div className="tl-where">Bridgenext</div>
                <p>
                  Six months full-time across React, Angular, Node.js, NestJS, GraphQL,
                  TypeORM, SQL Server and MongoDB — and, more usefully, six months of
                  learning how enterprise development actually runs day to day. It turned
                  into the role above.
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
                  Graduated with a CGPA of 8.28, which is the least interesting thing
                  about those four years. The rest went on things the syllabus never asked
                  for: 2048 in C with the graphics written by hand, a terminal that plays
                  Tic Tac Toe, an Android app for mapping litter, a real client&rsquo;s
                  storefront, and a video-based learning platform built with a team.
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
                <h2 className="reveal">Somewhere without a deploy button</h2>
              </div>
              <p className="reveal">
                Coastlines, hill stations, and the long way round. Open a place to see the
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
                <h2>Have something that has to actually work?</h2>
                <p>
                  A whole platform or one hard part of one — I am interested either way.
                  Email is the fastest route. I answer from GMT+5:45, which is a real time
                  zone, I promise.
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
        <span>Hand-built in Lumbini, Nepal. No template was harmed.</span>
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
