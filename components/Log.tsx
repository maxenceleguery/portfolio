import Image from "next/image";
import Papers from "@/components/Papers";
import { ARCHIVE, BIRTH_DATE, EDUCATION, EXPERIENCES, LANGUAGES } from "@/lib/data";
import { getAge } from "@/lib/utils";

export default function Log() {
  const rev = new Date().toISOString().slice(0, 7); // stamped at build time

  return (
    <div className="log">
      <p className="station-intro">Where I have worked, studied and published, and the flights before these ones.</p>

      <article className="sheet">
        <div className="title-block">
          <div>
            <span>Document</span>
            <strong>Service record</strong>
          </div>
          <div>
            <span>Crew</span>
            <strong>Maxence Leguéry</strong>
          </div>
          <div>
            <span>Revision</span>
            <strong>{rev}</strong>
          </div>
          <div>
            <span>Sheet</span>
            <strong>1 of 1</strong>
          </div>
        </div>

        <div className="sheet-body">
          <aside className="crew">
            <div className="crew-inner">
              <div className="crew-photo">
                <Image src="/about.webp" alt="Maxence Leguéry" width={350} height={450} sizes="(max-width: 860px) 150px, 300px" />
              </div>
              <dl>
                <div>
                  <dt>Role</dt>
                  <dd>Freelance engineer, CTO for Podtech</dd>
                </div>
                <div>
                  <dt>Base</dt>
                  <dd>Paris, France</dd>
                </div>
                <div>
                  <dt>Age</dt>
                  <dd>{getAge(BIRTH_DATE)}</dd>
                </div>
                <div>
                  <dt>Languages</dt>
                  <dd>
                    <ul>
                      {LANGUAGES.map((l) => (
                        <li key={l.name}>
                          {l.name} <span>{l.level.toLowerCase()}</span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </aside>

          <div className="record">
            <div>
              <h3>Experience</h3>
              {EXPERIENCES.map((e) => (
                <div className="entry" key={e.title + e.period}>
                  <div className="when">{e.period}</div>
                  <div>
                    <h4>{e.title}</h4>
                    <p className="where">
                      {e.companyUrl ? <a href={e.companyUrl}>{e.company}</a> : e.company}, {e.location}
                    </p>
                    <ul>
                      {e.description.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                    <p className="tools">{e.technologies.join(", ")}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3>Education</h3>
              {EDUCATION.map((e) => (
                <div className="entry" key={e.title}>
                  <div className="when">{e.period}</div>
                  <div>
                    <h4>{e.title}</h4>
                    <p className="where">{e.link ? <a href={e.link}>{e.institution}</a> : e.institution}</p>
                    <p className="desc">{e.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3>Publications</h3>
              <Papers />
              <div className="entry">
                <div className="when">2023</div>
                <div>
                  <h4>
                    <a className="paper-link" href="https://bibnum.ensta.fr/9537/">
                      Quasinormal modes in curved spacetimes
                    </a>
                  </h4>
                  <p className="where">Research report, ENSTA Paris and CPHT, École Polytechnique</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <div className="archive">
        <h3>Earlier flights</h3>
        <p>Student and early client projects, kept on file.</p>
        {ARCHIVE.map((p) => (
          <details key={p.id}>
            <summary>
              <span className="chev" aria-hidden="true">›</span>
              <span className="t">{p.title}</span>
              <span className="leader" aria-hidden="true" />
              <span className="tech">{p.technologies.slice(0, 3).join(" / ")}</span>
            </summary>
            <div className="body">
              <p style={{ margin: 0 }}>{p.description}</p>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <p style={{ margin: 0 }} className="stack">
                {p.technologies.join(", ")}
              </p>
              <div className="links" style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
                {p.siteUrl && <a className="link" href={p.siteUrl}>Visit the site</a>}
                {p.githubUrl && <a className="link" href={p.githubUrl}>Source on GitHub</a>}
                {p.reference && <a className="link" href={p.reference.url}>{p.reference.title}</a>}
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
