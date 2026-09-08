import ProjectRail from "@/components/ProjectRail";
import { eraBlurbs, eraLabels, projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function Home() {
  const ticker = [...projects, ...projects];

  return (
    <>
      <header className="nav">
        <div className="shell nav-inner">
          <a className="mark" href="#top">
            Suraj Ghimire<span>.</span>
          </a>
          <nav className="nav-links" aria-label="Sections">
            <a href="#work">Work</a>
            <a href="#projects">Projects</a>
            <a href="#stack">Stack</a>
            <a className="nav-cta" href="#contact">
              Get in touch
            </a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="shell hero" id="top">
          <div>
            <h1>
              <span className="line">
                <span>I build web</span>
              </span>
              <span className="line">
                <span>platforms that</span>
              </span>
              <span className="line">
                <span>go into production.</span>
              </span>
            </h1>

            <div className="fade-in">
              <p className="hero-lede">
                Full-stack developer in {site.location}. Full-time at{" "}
                <strong>Bridgenext</strong>, shipping client features across React, Angular,
                NestJS and .NET. The rest of my time goes to <strong>Mahavi</strong>, the
                team I build our own products with.
              </p>

              <div className="hero-actions">
                <a className="btn btn-solid" href="#projects">
                  See the work
                </a>
                <a className="btn" href={`mailto:${site.email}`}>
                  Email me
                </a>
              </div>
            </div>
          </div>

          <div className="ticker fade-in" aria-hidden="true">
            <div className="ticker-track">
              {ticker.map((p, i) => (
                <div className="ticker-item" key={`${p.slug}-${i}`}>
                  <b>{p.title}</b>
                  <i>{eraLabels[p.era]}</i>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="shell section" id="now">
          <div className="section-head">
            <h2>Where I am now</h2>
            <p>
              Two places, on purpose. One teaches me how software is built at scale for
              clients; the other lets our team decide everything ourselves.
            </p>
          </div>

          <div className="now">
            <div className="now-cell">
              <span className="role">Full-time</span>
              <h3>Bridgenext</h3>
              <p>
                Software Developer on real client products. Production features in React,
                Angular, Node.js and NestJS, alongside APIs, databases, Apache Kafka and
                event-driven pub-sub architecture — inside Git workflows, code review and
                Agile delivery.
              </p>
            </div>
            <div className="now-cell">
              <span className="role">With the team</span>
              <h3>Mahavi</h3>
              <p>
                A four-person team building our own products and taking on client work.
                I sit on the core dev side: Next.js, Fastify and PostgreSQL, plus the
                studio site at mahavi.tech.
              </p>
            </div>
            <div className="now-cell">
              <span className="role">Based in</span>
              <h3>Lumbini, Nepal</h3>
              <p>
                B.Tech from Rajarambapu Institute of Technology, Maharashtra, finished in
                2025 with a CGPA of 8.28. Comfortable working remote across time zones.
              </p>
            </div>
          </div>
        </section>

        <section className="shell section" id="work">
          <div className="section-head">
            <h2>How I got here</h2>
            <p>
              Five years, in order: learning the fundamentals the hard way, then enterprise
              development, then shipping and owning products.
            </p>
          </div>

          <div className="timeline">
            <div className="tl-row">
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
            </div>

            <div className="tl-row">
              <div className="tl-when">Internship</div>
              <div className="tl-what">
                <h3>Software Development Intern</h3>
                <div className="tl-where">Bridgenext</div>
                <p>
                  Six months full-time, building full-stack projects across React, Angular,
                  Node.js, NestJS, GraphQL, TypeORM, SQL Server and MongoDB, and learning
                  how enterprise development workflows actually run day to day.
                </p>
              </div>
            </div>

            <div className="tl-row">
              <div className="tl-when">Current</div>
              <div className="tl-what">
                <h3>Software Developer</h3>
                <div className="tl-where">Bridgenext</div>
                <p>
                  Moved up from the internship into client project work, developing and
                  maintaining production features in React, Angular and NestJS. Hands-on
                  with Apache Kafka and event-driven pub-sub architecture, plus APIs,
                  databases and enterprise application architecture.
                </p>
                <p>
                  Work happens with cross-functional teams under Git-based workflows, code
                  review, Agile practice and enterprise delivery standards.
                </p>
              </div>
            </div>

            <div className="tl-row">
              <div className="tl-when">Alongside</div>
              <div className="tl-what">
                <h3>Core developer</h3>
                <div className="tl-where">Mahavi</div>
                <p>
                  Shipping production platforms with the team: a CMS-backed platform for an
                  Australian client, a multi-tenant restaurant management system,
                  helpnepali.com, and the studio site itself.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="shell section" id="projects">
          <div className="section-head">
            <h2>Every project, in one place</h2>
            <p>
              {projects.length} builds across three chapters. {eraBlurbs.mahavi}{" "}
              {eraBlurbs.bridgenext} {eraBlurbs.college}
            </p>
          </div>
          <ProjectRail />
        </section>

        <section className="shell section" id="stack">
          <div className="section-head">
            <h2>What I work with</h2>
            <p>
              Mostly TypeScript on both ends. I care more about how a system is shaped than
              which framework draws it.
            </p>
          </div>

          <div className="stack-grid">
            <div className="stack-group">
              <h3>Front end</h3>
              <ul>
                <li>React</li>
                <li>Next.js</li>
                <li>Angular</li>
                <li>TypeScript</li>
                <li>HTML and CSS</li>
              </ul>
            </div>
            <div className="stack-group">
              <h3>Back end</h3>
              <ul>
                <li>NestJS</li>
                <li>Fastify</li>
                <li>Node.js</li>
                <li>.NET</li>
                <li>GraphQL and REST</li>
              </ul>
            </div>
            <div className="stack-group">
              <h3>Data</h3>
              <ul>
                <li>PostgreSQL</li>
                <li>SQL Server</li>
                <li>MongoDB</li>
                <li>TypeORM</li>
              </ul>
            </div>
            <div className="stack-group">
              <h3>Systems and tooling</h3>
              <ul>
                <li>Apache Kafka</li>
                <li>Event-driven pub-sub</li>
                <li>Git and code review</li>
                <li>Claude and coding agents</li>
                <li>Java, C, Kotlin</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="shell section" id="contact">
          <div className="contact">
            <div>
              <h2>Have something worth building?</h2>
              <p>
                I am open to interesting product work, whether that is a full platform or
                one hard part of one. The fastest way to reach me is email.
              </p>
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
        </section>
      </main>

      <footer className="shell footer">
        <span>© {new Date().getFullYear()} Suraj Ghimire</span>
        <span>Built with Next.js in Lumbini, Nepal</span>
      </footer>
    </>
  );
}
