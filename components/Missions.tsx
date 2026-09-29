"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import dynamic from "next/dynamic";
import AutoVideo from "@/components/AutoVideo";
import { ARCHIVE, MISSIONS, type Mission } from "@/lib/data";

const CutforgeEditor = dynamic(() => import("@/components/CutforgeEditor"), {
  ssr: false,
  loading: () => <div className="booting">Booting editor…</div>,
});

function Feed({ m, powered, onPower }: { m: Mission; powered: boolean; onPower: () => void }) {
  const s = m.screen;
  if (s.kind === "cutforge") {
    return powered ? (
      <div className="editor-host">
        <CutforgeEditor />
      </div>
    ) : (
      <div className="poweron" style={{ ["--poster" as string]: `url(${s.poster})` }}>
        <button type="button" className="btn btn-primary" onClick={onPower}>
          Power on the editor
        </button>
        <p>Loads the real @cutforge/editor package in demo mode, with two clips from this page on the timeline. Best on a desktop Chromium browser.</p>
      </div>
    );
  }
  if (s.kind === "stills") {
    return (
      <div className="stills">
        {s.stills.map((st) => (
          <figure className="still" key={st.src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="still-bg" src={st.src} alt="" aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="still-fg" src={st.src} alt={st.alt} />
          </figure>
        ))}
      </div>
    );
  }
  const [left, ...rest] = s.stills;
  return (
    <div className="phones">
      <div className="phone">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={left.src} alt={left.alt} />
      </div>
      <div className="phone main">
        {s.video ? (
          <AutoVideo src={s.video.src} poster={s.video.poster} label={`${m.name} in use`} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={rest[0].src} alt={rest[0].alt} />
        )}
      </div>
      {(s.video ? rest : rest.slice(1)).map((st) => (
        <div className="phone" key={st.src}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={st.src} alt={st.alt} />
        </div>
      ))}
    </div>
  );
}

function Dossier({ m, hidden }: { m: Mission; hidden: boolean }) {
  return (
    <article className="dossier brackets" role="tabpanel" id={`panel-${m.id}`} aria-labelledby={`tab-${m.id}`} hidden={hidden}>
      <div className="title-block">
        <div>
          <span>Mission</span>
          <h3 className="name" style={{ margin: 0 }}>{m.name}</h3>
        </div>
        <div>
          <span>Since</span>
          <strong>{m.year}</strong>
        </div>
        <div>
          <span>Status</span>
          <strong>
            <span className="lamp" data-state={m.status} aria-hidden="true" />
            {m.statusLabel}
          </strong>
        </div>
      </div>
      <p className="kicker">{m.kicker}</p>
      <p className="role">{m.role}</p>
      <p className="summary">{m.summary}</p>
      {m.figures && (
        <dl className="figures">
          {m.figures.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      )}
      <ul className="notes">
        {m.notes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
      <p className="stack">{m.stack.join("  /  ")}</p>
      <div className="links">
        {m.links.map((l) => (
          <a key={l.href} className="link" href={l.href}>
            {l.label}
          </a>
        ))}
        {m.reference && (
          <a className="link" href={m.reference.url}>
            Research report
          </a>
        )}
      </div>
    </article>
  );
}

export default function Missions() {
  const [active, setActive] = useState(0);
  const [powered, setPowered] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const m = MISSIONS[active];

  const onKeyDown = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    const next = (active + d + MISSIONS.length) % MISSIONS.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className="wrap bay" id="missions">
      <header className="bay-head">
        <h2 className="plate">Missions</h2>
        <p>Products I built and still run. Pick one to put it on screen.</p>
      </header>

      <div className="selector" role="tablist" aria-label="Missions" onKeyDown={onKeyDown}>
        {MISSIONS.map((mm, i) => (
          <button
            key={mm.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${mm.id}`}
            aria-selected={i === active}
            aria-controls={`panel-${mm.id}`}
            tabIndex={i === active ? 0 : -1}
            className="key"
            onClick={() => setActive(i)}
          >
            <span className="lamp" data-state={mm.status} aria-hidden="true" />
            {mm.name}
          </button>
        ))}
      </div>

      <div className="mission" data-powered={powered && m.screen.kind === "cutforge"}>
        <div className="screen mission-screen">
          <div className="screen-bar">
            <span>CH {active + 1}</span>
            <span className="grow">{m.name.toUpperCase()}</span>
            <span>{m.screen.kind === "cutforge" ? (powered ? "LIVE PACKAGE" : "STANDBY") : "FEED"}</span>
          </div>
          <div className="feed" key={m.id}>
            <Feed m={m} powered={powered} onPower={() => setPowered(true)} />
          </div>
        </div>
        <div className="mission-panels">
          {MISSIONS.map((mm, i) => (
            <Dossier key={mm.id} m={mm} hidden={i !== active} />
          ))}
        </div>
      </div>

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
    </section>
  );
}
